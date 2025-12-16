import { Module, forwardRef } from '@nestjs/common';
import { AddendaService } from './addenda.service';
import { AddendaController } from './addenda.controller';
import { DatabaseModule } from '../database/database.module';
import { addendaProviders } from './addenda.providers';

// Relaciones
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => SessionsModule), // Validar sesión original
    forwardRef(() => UsersModule),    // Validar usuario creador
    forwardRef(() => AuditModule),
  ],
  controllers: [AddendaController],
  providers: [
    ...addendaProviders,
    AddendaService,
  ],
  exports: [AddendaService],
})
export class AddendaModule {}