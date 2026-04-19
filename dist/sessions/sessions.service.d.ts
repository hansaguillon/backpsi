import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PatientsService } from '../patients/patients.service';
import { User } from '../users/entities/user.entity';
export declare class SessionsService {
    private readonly sessionsRepository;
    private readonly patientsService;
    private readonly EDIT_WINDOW_MINUTES;
    constructor(sessionsRepository: Repository<Session>, patientsService: PatientsService);
    create(dto: CreateSessionDto, user: User): Promise<Session>;
    findAll(): Promise<Session[]>;
    findAllByPatient(patientId: string, page?: number, limit?: number): Promise<{
        data: Session[];
        total: number;
    }>;
    findOne(id: string): Promise<Session>;
    update(id: string, dto: UpdateSessionDto, user: {
        sub: string;
        role: string;
    }): Promise<Session>;
    lockSession(id: string): Promise<Session>;
    private lock;
    private autoLockIfExpired;
    private isEditWindowExpired;
}
