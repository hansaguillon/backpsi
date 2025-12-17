import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuditModule } from './audit/audit.module';
import { AddendaModule } from './addenda/addenda.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'juan2983A!',
      database: 'clinical_db',

      autoLoadEntities: true, // 🔑 MUY IMPORTANTE
      synchronize: false,     // correcto para sistema clínico
      logging: true,
    }),

    AuthModule,
    UsersModule,
    PatientsModule,
    SessionsModule,
    AuditModule,
    AddendaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
