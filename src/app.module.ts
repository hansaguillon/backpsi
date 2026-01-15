import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuditModule } from './audit/audit.module';
import { AddendaModule } from './addenda/addenda.module';

@Module({
  imports: [
    // 🔹 FRONTEND (React build)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // 🔹 BASE DE DATOS
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'juan2983A!',
      database: 'clinical_db',

      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),

    // 🔹 MÓDULOS DE LA APP
    AuthModule,
    UsersModule,
    PatientsModule,
    SessionsModule,
    AuditModule,
    AddendaModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
