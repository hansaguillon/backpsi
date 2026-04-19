import { AuditLog } from '../../audit/entities/audit.entity';
import { Addendum } from '../../addenda/entities/addendum.entity';
export type UserRole = 'psychologist' | 'doctor' | 'kinesiologist' | 'admin';
export declare class User {
    id: string;
    username: string;
    password_hash: string;
    name: string;
    role: UserRole;
    last_login?: Date;
    createdAt: Date;
    updatedAt: Date;
    auditLogs: AuditLog[];
    addenda: Addendum[];
}
