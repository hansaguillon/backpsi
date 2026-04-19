import { Repository } from 'typeorm';
import { SessionAttachment } from './entities/session-attachment.entity';
import { Session } from '../sessions/entities/session.entity';
export declare class SessionAttachmentsService {
    private readonly attachmentsRepository;
    private readonly sessionsRepository;
    constructor(attachmentsRepository: Repository<SessionAttachment>, sessionsRepository: Repository<Session>);
    addMany(sessionId: string, files: {
        url: string;
        originalName: string;
        mimeType: string;
        size: number;
    }[]): Promise<SessionAttachment[]>;
    findBySession(sessionId: string): Promise<SessionAttachment[]>;
}
