import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { Session } from './entities/session.entity';

// Relaciones
import { PatientsModule } from '../patients/patients.module';
import { AddendaModule } from '../addenda/addenda.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]), // 👈 CLAVE
    forwardRef(() => PatientsModule),
    forwardRef(() => AddendaModule),
    forwardRef(() => AuditModule),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
