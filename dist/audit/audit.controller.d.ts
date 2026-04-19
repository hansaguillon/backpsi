import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(req: any): Promise<import("./entities/audit.entity").AuditLog[]>;
    findByDateRange(startDate: string, endDate: string, req: any): Promise<import("./entities/audit.entity").AuditLog[]>;
    findByEntity(entityType: string, entityId: string, req: any): Promise<import("./entities/audit.entity").AuditLog[]>;
}
