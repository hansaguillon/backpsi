import { Module, forwardRef } from '@nestjs/common';
import { AuditService } from './audit.service';
import { DatabaseModule } from '../database/database.module';
import { auditProviders } from './audit.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UsersModule), // Opcional, si necesitas validar datos del usuario en el log
  ],
  providers: [
    ...auditProviders,
    AuditService,
  ],
  exports: [AuditService], // Vital exportarlo para que TODOS los demás lo usen
})
export class AuditModule {}