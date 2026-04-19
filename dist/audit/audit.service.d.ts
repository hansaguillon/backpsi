import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit.entity';
export declare class AuditService {
    private readonly auditRepository;
    constructor(auditRepository: Repository<AuditLog>);
    log(userId: string, action: string, entityType: string, entityId: string, details?: string, ip?: string): Promise<AuditLog>;
    findAll(userId: string): Promise<AuditLog[]>;
    findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<AuditLog[]>;
    findByEntity(userId: string, entityType: string, entityId: string): Promise<AuditLog[]>;
}
