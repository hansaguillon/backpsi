import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';

// Módulos con los que se relaciona
import { AuditModule } from '../audit/audit.module';
import { AddendaModule } from '../addenda/addenda.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuditModule),   // Para registrar acciones del usuario
    forwardRef(() => AddendaModule), // Para ver adendas creadas por el usuario
  ],
  controllers: [UsersController],
  providers: [
    ...usersProviders, // Tu array de providers
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}