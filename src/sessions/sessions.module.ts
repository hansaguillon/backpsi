import { Module, forwardRef } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { DatabaseModule } from '../database/database.module';
import { sessionsProviders } from './sessions.providers';

// Relaciones
import { PatientsModule } from '../patients/patients.module';
import { AddendaModule } from '../addenda/addenda.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => PatientsModule), // Necesitamos validar el paciente
    forwardRef(() => AddendaModule),  // Una sesión tiene adendas
    forwardRef(() => AuditModule),    // Auditar bloqueos y creaciones
  ],
  controllers: [SessionsController],
  providers: [
    ...sessionsProviders,
    SessionsService,
  ],
  exports: [SessionsService], // Exportamos para que Addenda pueda consultarlo
})
export class SessionsModule {}