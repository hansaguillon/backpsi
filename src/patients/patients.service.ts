import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
    private readonly auditService: AuditService,
  ) {}

  // =========================
  // CREATE
  // =========================
  async create(
    dto: CreatePatientDto,
    user: { sub: string; email: string },
  ): Promise<Patient> {
    const existing = await this.patientsRepository.findOne({
      where: { dni: dto.dni },
    });

    if (existing) {
      throw new ConflictException(
        `Ya existe un paciente con DNI ${dto.dni}`,
      );
    }

    const patient = this.patientsRepository.create({
      ...dto,
      status: 'active',
    });

    const saved = await this.patientsRepository.save(patient);

    await this.auditService.log(
      user.sub,
      'CREATE',
      'PATIENT',
      saved.id,
    );

    return saved;
  }

  // =========================
  // FIND ALL
  // =========================
  async findAll(
    status?: 'active' | 'inactive',
  ): Promise<Patient[]> {
    return this.patientsRepository.find({
      where: status ? { status } : {},
      order: { createdAt: 'DESC' },
    });
  }

  // =========================
  // FIND ONE
  // =========================
  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['sessions'],
    });

    if (!patient) {
      throw new NotFoundException(
        `Paciente con ID ${id} no encontrado`,
      );
    }

    return patient;
  }

  // =========================
  // UPDATE
  // =========================
  async update(
    id: string,
    dto: UpdatePatientDto,
    user: { sub: string; email: string },
  ): Promise<Patient> {
    const patient = await this.findOne(id);

    if (dto.status === 'inactive' && !dto.dischargeDate) {
      throw new ConflictException(
        'Para dar de baja un paciente se requiere la fecha de egreso',
      );
    }

    if (dto.status === 'active') {
      patient.dischargeDate = undefined;
      patient.dischargeReason = undefined;
    }

    Object.assign(patient, dto);

    const updated = await this.patientsRepository.save(patient);

    await this.auditService.log(
      user.sub,
      'EDIT',
      'PATIENT',
      id,
    );

    return updated;
  }

  // =========================
  // REMOVE
  // =========================
  async remove(
    id: string,
    user: { sub: string; email: string },
  ): Promise<void> {
    const patient = await this.findOne(id);

    await this.patientsRepository.remove(patient);

    await this.auditService.log(
      user.sub,
      'DELETE',
      'PATIENT',
      id,
    );
  }
}
