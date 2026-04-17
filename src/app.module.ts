import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppService } from './app.service';
import { NetworkController } from './network/network.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuditModule } from './audit/audit.module';
import { AddendaModule } from './addenda/addenda.module';
import { BackupModule } from './backup/backup.module';
import { SessionAttachmentsModule } from './session-attachments/session-attachments.module';
import { UploadsModule } from './uploads/uploads.module';
import { ExercisePlansModule } from './exercise-plans/exercise-plans.module';

@Module({
  imports: [
    // 🔹 FRONTEND (React build)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // 🔹 CONFIG
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env'),
    }),

    // 🔹 RATE LIMITING
    ThrottlerModule.forRoot({
      throttlers: [{ name: 'default', ttl: 60_000, limit: 100 }],
    }),

    // 🔹 BASE DE DATOS
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get('DB_USER', 'root'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get('DB_NAME', 'clinical_db'),
        autoLoadEntities: true,
        synchronize: false,
        logging: config.get('NODE_ENV') === 'development',
        extra: { connectTimeout: 10000 },
      }),
    }),

    // 🔹 MÓDULOS DE LA APp
    BackupModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    SessionsModule,
    AuditModule,
    UploadsModule,
    AddendaModule,
    SessionAttachmentsModule,
    ExercisePlansModule,
  ],
  controllers: [NetworkController],
  providers: [AppService],
})
export class AppModule {}
