import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuditModule } from './audit/audit.module';
import { AddendaModule } from './addenda/addenda.module';

@Module({
  imports: [AuthModule, UsersModule, PatientsModule, SessionsModule, AuditModule, AddendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
