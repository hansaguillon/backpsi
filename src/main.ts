import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';
import * as os from 'os';
import { NestExpressApplication } from '@nestjs/platform-express';

/**
 * Detecta las IPs del servidor en runtime y construye regexps que permiten
 * cualquier dispositivo en la misma subred /24.
 * Ej: servidor en 172.20.1.5 → permite http://172.20.1.*:cualquier-puerto
 */
function buildAllowedOrigins(): RegExp[] {
  const patterns: RegExp[] = [
    /^http:\/\/localhost(:\d+)?$/,
    /^http:\/\/127\.0\.0\.1(:\d+)?$/,
    // Rangos privados RFC 1918 — cubre cualquier red local sin importar cuándo arranca el servicio
    /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}(:\d+)?$/,
    /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/,
    /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}(:\d+)?$/,
  ];

  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    if (!iface) continue;
    for (const addr of iface) {
      if (addr.family !== 'IPv4' || addr.internal) continue;
      // Primeros 3 octetos = subred /24 — cubre la red típica del consultorio
      const subnet = addr.address.split('.').slice(0, 3).join('\\.');
      patterns.push(new RegExp(`^http:\\/\\/${subnet}\\.\\d{1,3}(:\\d+)?$`));
    }
  }

  return patterns;
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadsPath = join(process.cwd(), 'uploads');
  const publicPath  = join(__dirname, '..', 'public');

  app.use('/uploads', express.static(uploadsPath));

  // Sirve el build del frontend (React SPA)
  app.useStaticAssets(publicPath);
  // Catch-all: cualquier ruta no-API devuelve index.html (React Router)
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.path.startsWith('/auth') &&
        !req.path.startsWith('/patients') &&
        !req.path.startsWith('/sessions') &&
        !req.path.startsWith('/addenda') &&
        !req.path.startsWith('/audit') &&
        !req.path.startsWith('/backup') &&
        !req.path.startsWith('/uploads') &&
        !req.path.startsWith('/session-attachments')) {
      res.sendFile(join(publicPath, 'index.html'));
    } else {
      next();
    }
  });

  // Construye los patrones CORS desde las IPs reales del servidor.
  // Si el servidor está en 172.20.1.5, permite cualquier 172.20.1.x automáticamente.
  // No hay rangos hardcodeados — funciona con cualquier configuración de router.
  const allowedOrigins = buildAllowedOrigins();

  app.enableCors({
    origin: (origin, callback) => {
      // Sin origin = Postman / app nativa / curl — permitir
      if (!origin) return callback(null, true);
      if (allowedOrigins.some((pattern) => pattern.test(origin))) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origen no permitido — ${origin}`));
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
