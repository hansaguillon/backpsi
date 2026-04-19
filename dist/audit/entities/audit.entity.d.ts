import { User } from '../../users/entities/user.entity';
export declare class AuditLog {
    id: string;
    action: string;
    entity_type: string;
    entity_id: string;
    details: string;
    user_id: string;
    ip_address?: string;
    timestamp: Date;
    user: User;
}
