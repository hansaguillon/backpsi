import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

// Relaciones
import { AuditModule } from '../audit/audit.module';
import { AddendaModule } from '../addenda/addenda.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 👈 CLAVE
    forwardRef(() => AuditModule),
    forwardRef(() => AddendaModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
