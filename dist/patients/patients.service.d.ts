import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuditService } from '../audit/audit.service';
export declare class PatientsService {
    private readonly patientsRepository;
    private readonly auditService;
    constructor(patientsRepository: Repository<Patient>, auditService: AuditService);
    create(dto: CreatePatientDto, user: {
        sub: string;
    }): Promise<Patient>;
    findAll(status?: 'active' | 'inactive', page?: number, limit?: number): Promise<{
        data: Patient[];
        total: number;
    }>;
    findOne(id: string): Promise<Patient>;
    update(id: string, dto: UpdatePatientDto, user: {
        sub: string;
    }): Promise<Patient>;
    discharge(id: string, dischargeDate: string, dischargeReason: string, user: {
        sub: string;
    }): Promise<Patient>;
}
