import { Repository } from 'typeorm';
import { Addendum } from './entities/addendum.entity';
import { CreateAddendumDto } from './dto/create-addendum.dto';
import { AuditService } from '../audit/audit.service';
import { SessionsService } from '../sessions/sessions.service';
export declare class AddendaService {
    private readonly addendaRepository;
    private readonly auditService;
    private readonly sessionsService;
    constructor(addendaRepository: Repository<Addendum>, auditService: AuditService, sessionsService: SessionsService);
    create(dto: CreateAddendumDto, userId: string): Promise<Addendum>;
    findAllBySession(sessionId: string, userId: string): Promise<Addendum[]>;
    findOne(id: string, userId: string): Promise<Addendum>;
}
