import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS solo para localhost (seguro y simple)
  app.enableCors({
    origin: [
    'http://localhost:3000', // Front principal
    'http://localhost:8081', // Front de prueba
  ],
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Puerto fijo local
  await app.listen(3000);
}
bootstrap();