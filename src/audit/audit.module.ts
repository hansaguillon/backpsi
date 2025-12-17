import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditService } from './audit.service';
import { AuditLog } from './entities/audit.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog]),
    forwardRef(() => UsersModule),
  ],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
