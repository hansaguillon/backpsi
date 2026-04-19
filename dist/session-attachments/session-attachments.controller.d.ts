import { SessionAttachmentsService } from './session-attachments.service';
export declare class SessionAttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: SessionAttachmentsService);
    addAttachments(sessionId: string, body: {
        files: {
            url: string;
            originalName: string;
            mimeType: string;
            size: number;
        }[];
    }): Promise<import("./entities/session-attachment.entity").SessionAttachment[]>;
    findAll(sessionId: string): Promise<import("./entities/session-attachment.entity").SessionAttachment[]>;
}
