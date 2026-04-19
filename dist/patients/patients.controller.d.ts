import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(dto: CreatePatientDto, req: any): Promise<import("./entities/patient.entity").Patient>;
    findAll(status?: 'active' | 'inactive', page?: string, limit?: string): Promise<{
        data: import("./entities/patient.entity").Patient[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/patient.entity").Patient>;
    update(id: string, dto: UpdatePatientDto, req: any): Promise<import("./entities/patient.entity").Patient>;
}
