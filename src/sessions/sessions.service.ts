import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { PatientsService } from '../patients/patients.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SessionsService {
  private readonly EDIT_WINDOW_MINUTES = 10;

  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
    private readonly patientsService: PatientsService,
  ) {}

  /* ===================== CREATE ===================== */
  async create(
    dto: CreateSessionDto,
    user: User,
  ): Promise<Session> {
    await this.patientsService.findOne(dto.patientId);

    /* Limpieza por rol */
    if (user.role === 'psychologist') {
      dto.vitalSigns = undefined;
      dto.prescription = undefined;
      dto.diagnosis = undefined;
      dto.studies = undefined;
      dto.kinesicPlan = undefined;
      dto.evolution = undefined;
    }

    if (user.role === 'doctor') {
      dto.kinesicPlan = undefined;
      dto.evolution = undefined;
    }

    if (user.role === 'kinesiologist') {
      dto.diagnosis = undefined;
      dto.prescription = undefined;
      dto.studies = undefined;
      dto.vitalSigns = undefined;
    }

    const session = this.sessionsRepository.create({
      patientId: dto.patientId,
      content: dto.content,
      importantEvents: dto.importantEvents,

      vitalSigns: dto.vitalSigns,
      diagnosis: dto.diagnosis,
      prescription: dto.prescription,
      studies: dto.studies,

      kinesicPlan: dto.kinesicPlan,
      evolution: dto.evolution,

      isLocked: false,
    });

    return this.sessionsRepository.save(session);
  }

  /* ===================== FIND ALL ===================== */
  async findAll(): Promise<Session[]> {
    return this.sessionsRepository
      .createQueryBuilder('session')
      .innerJoinAndSelect('session.patient', 'patient')
      .leftJoinAndSelect('session.addenda', 'addenda')
      .where('patient.status = :status', { status: 'active' })
      .orderBy('session.createdAt', 'DESC')
      .getMany();
  }

  /* ===================== FIND BY PATIENT ===================== */
  async findAllByPatient(patientId: string): Promise<Session[]> {
    await this.patientsService.findOne(patientId);

    return this.sessionsRepository.find({
      where: { patientId },
      relations: ['addenda'],
      order: { createdAt: 'DESC' },
    });
  }

  /* ===================== FIND ONE ===================== */
  async findOne(id: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ['addenda', 'patient'],
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    await this.autoLockIfExpired(session);

    return session;
  }

  /* ===================== UPDATE ===================== */
  async update(
    id: string,
    dto: UpdateSessionDto,
  ): Promise<Session> {
    const session = await this.findOne(id);

    if (session.isLocked) {
      throw new ForbiddenException(
        'Sesión bloqueada. Use una adenda.',
      );
    }

    if (this.isEditWindowExpired(session)) {
      await this.lock(session);
      throw new ForbiddenException(
        'Ventana de edición expirada. Use una adenda.',
      );
    }

    session.content = dto.content ?? session.content;
    session.importantEvents =
      dto.importantEvents ?? session.importantEvents;

    return this.sessionsRepository.save(session);
  }

  /* ===================== LOCK ===================== */
  async lockSession(id: string): Promise<Session> {
    const session = await this.findOne(id);
    return this.lock(session);
  }

  /* ===================== HELPERS ===================== */

  private async lock(session: Session): Promise<Session> {
    if (!session.isLocked) {
      session.isLocked = true;
      session.lockedAt = new Date();
      return this.sessionsRepository.save(session);
    }
    return session;
  }

  private async autoLockIfExpired(session: Session) {
    if (session.isLocked) return;

    if (this.isEditWindowExpired(session)) {
      await this.lock(session);
    }
  }

  private isEditWindowExpired(session: Session): boolean {
    const expiresAt =
      new Date(session.createdAt).getTime() +
      this.EDIT_WINDOW_MINUTES * 60_000;

    return Date.now() > expiresAt;
  }
}
