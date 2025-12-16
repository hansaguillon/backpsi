import { Module, forwardRef } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { DatabaseModule } from '../database/database.module';
import { patientsProviders } from './patients.providers';

// Relaciones
import { SessionsModule } from '../sessions/sessions.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => SessionsModule), // Un paciente tiene muchas sesiones
    forwardRef(() => AuditModule),    // Auditar creación/edición de pacientes
  ],
  controllers: [PatientsController],
  providers: [
    ...patientsProviders,
    PatientsService,
  ],
  exports: [PatientsService],
})
export class PatientsModule {}