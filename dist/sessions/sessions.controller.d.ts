import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    findAll(): Promise<import("./entities/session.entity").Session[]>;
    create(dto: CreateSessionDto, req: any): Promise<import("./entities/session.entity").Session>;
    findAllByPatient(patientId: string, page?: string, limit?: string): Promise<{
        data: import("./entities/session.entity").Session[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/session.entity").Session>;
    update(id: string, dto: UpdateSessionDto, req: any): Promise<import("./entities/session.entity").Session>;
    lock(id: string): Promise<import("./entities/session.entity").Session>;
}
