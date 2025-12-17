import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddendaService } from './addenda.service';
import { AddendaController } from './addenda.controller';
import { Addendum } from './entities/addendum.entity';

// Relaciones
import { SessionsModule } from '../sessions/sessions.module';
import { UsersModule } from '../users/users.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Addendum]),

    forwardRef(() => SessionsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => AuditModule),
  ],
  controllers: [AddendaController],
  providers: [AddendaService],
  exports: [AddendaService],
})
export class AddendaModule {}
