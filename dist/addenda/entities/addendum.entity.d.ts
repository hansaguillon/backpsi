import { Session } from '../../sessions/entities/session.entity';
import { User } from '../../users/entities/user.entity';
export declare class Addendum {
    id: string;
    session_id: string;
    content: string;
    reason: string;
    created_by: string;
    created_at: Date;
    session: Session;
    createdByUser: User;
}
