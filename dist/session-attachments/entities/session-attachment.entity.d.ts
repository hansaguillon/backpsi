import { Session } from '../../sessions/entities/session.entity';
export declare class SessionAttachment {
    id: string;
    sessionId: string;
    session: Session;
    url: string;
    originalName: string;
    mimeType: string;
    size: number;
    createdAt: Date;
}
