import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createPatientDto: CreatePatientDto, user: { sub: string; email: string }): Promise<Patient> {
    const patient = this.patientsRepository.create(createPatientDto);
    const savedPatient = await this.patientsRepository.save(patient);

    await this.auditService.log(
      user.sub,
      'CREATED',
      'PATIENT',
      savedPatient.id,
    );

    return savedPatient;
  }

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { id },
      relations: ['sessions'],
    });

    if (!patient) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }

    return patient;
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
    user: { sub: string; email: string },
  ): Promise<Patient> {
    const patient = await this.findOne(id);
    Object.assign(patient, updatePatientDto);
    const updatedPatient = await this.patientsRepository.save(patient);

    await this.auditService.log(
      user.sub,
      'EDIT',
      'PATIENT',
      id,
    );

    return updatedPatient;
  }

  async remove(id: string, user: { sub: string; email: string }): Promise<void> {
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
