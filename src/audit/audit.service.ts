import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { AuditLog } from './entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

async log(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  details?: string,
): Promise<AuditLog> {
  const auditLog = this.auditRepository.create({
    user_id: userId,              // ✅ FK directa
    action,
    entity_type: entityType,
    entity_id: entityId,
    details: details ?? '',       // ✅ nunca null
  });

  return this.auditRepository.save(auditLog);
}

  async findAll(userId: string): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: { user: { id: userId } },
      order: { timestamp: 'DESC' },
      take: 100,
    });
  }

  async findByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: {
        user: { id: userId },
        timestamp: Between(startDate, endDate),
      },
      order: { timestamp: 'DESC' },
    });
  }

  async findByEntity(
    userId: string,
    entityType: string,
    entityId: string,
  ): Promise<AuditLog[]> {
    return this.auditRepository.find({
      where: {
        user: { id: userId },
        entity_type: entityType,
        entity_id: entityId,
      },
      order: { timestamp: 'DESC' },
    });
  }
}
