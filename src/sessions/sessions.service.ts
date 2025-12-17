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
import { AuditService } from '../audit/audit.service';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class SessionsService {
  /**
   * Ventana legal de edición (minutos)
   * Cambiar solo este valor si la normativa lo requiere
   */
  private readonly EDIT_WINDOW_MINUTES = 10;

  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
    private readonly auditService: AuditService,
    private readonly patientsService: PatientsService,
  ) {}

  /* ======================================================
   * CREATE
   * ====================================================== */
  async create(
    createSessionDto: CreateSessionDto,
    userId: string,
  ): Promise<Session> {
    // Verificar que el paciente exista
    await this.patientsService.findOne(createSessionDto.patientId);

    const session = this.sessionsRepository.create({
      content: createSessionDto.content,
      important_events: createSessionDto.importantEvents,
      attachments: createSessionDto.attachments,
      patient_id: createSessionDto.patientId,
      is_locked: false,
      // created_at y locked_at se manejan automáticamente
    });

    const savedSession = await this.sessionsRepository.save(session);

    await this.auditService.log(
      userId,
      'SESSION_CREATED',
      'SESSION',
      savedSession.id,
      'Creación de sesión clínica',
    );

    return savedSession;
  }

  /* ======================================================
   * FIND ALL BY PATIENT
   * ====================================================== */
  async findAllByPatient(
    patientId: string,
    userId: string,
  ): Promise<Session[]> {
    await this.patientsService.findOne(patientId);

    return this.sessionsRepository.find({
      where: { patient_id: patientId },
      relations: ['addenda'],
      order: { created_at: 'DESC' },
    });
  }

  /* ======================================================
   * FIND ONE
   * ====================================================== */
  async findOne(id: string, userId: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ['patient', 'addenda'],
    });

    if (!session) {
      throw new NotFoundException(`Sesión con ID ${id} no encontrada`);
    }

    // Verificar que el paciente exista
    await this.patientsService.findOne(session.patient_id);

    // Auto-lock si venció la ventana legal
    await this.checkAndLockSession(session);

    await this.auditService.log(
      userId,
      'SESSION_ACCESSED',
      'SESSION',
      id,
      'Acceso a sesión clínica',
    );

    return session;
  }

  /* ======================================================
   * UPDATE
   * ====================================================== */
  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
    userId: string,
  ): Promise<Session> {
    const session = await this.findOne(id, userId);

    if (session.is_locked) {
      throw new ForbiddenException(
        'La sesión está bloqueada y no puede ser editada. Use una adenda.',
      );
    }

    if (this.isEditWindowExpired(session)) {
      session.is_locked = true;
      session.locked_at = new Date();
      await this.sessionsRepository.save(session);

      throw new ForbiddenException(
        'La ventana de edición ha expirado. Use una adenda.',
      );
    }

    Object.assign(session, {
      content: updateSessionDto.content ?? session.content,
      important_events:
        updateSessionDto.importantEvents ?? session.important_events,
      attachments:
        updateSessionDto.attachments ?? session.attachments,
    });

    const updatedSession = await this.sessionsRepository.save(session);

    await this.auditService.log(
      userId,
      'SESSION_UPDATED',
      'SESSION',
      id,
      'Edición dentro de ventana permitida',
    );

    return updatedSession;
  }

  /* ======================================================
   * MANUAL LOCK
   * ====================================================== */
  async lockSession(id: string, userId: string): Promise<Session> {
    const session = await this.findOne(id, userId);

    if (!session.is_locked) {
      session.is_locked = true;
      session.locked_at = new Date();
      await this.sessionsRepository.save(session);

      await this.auditService.log(
        userId,
        'SESSION_LOCKED',
        'SESSION',
        id,
        'Bloqueo manual de sesión',
      );
    }

    return session;
  }

  /* ======================================================
   * PRIVATE HELPERS
   * ====================================================== */

  /**
   * Bloquea la sesión automáticamente si expiró la ventana legal
   */
  private async checkAndLockSession(session: Session): Promise<void> {
    if (session.is_locked) return;

    if (this.isEditWindowExpired(session)) {
      session.is_locked = true;
      session.locked_at = new Date();
      await this.sessionsRepository.save(session);
    }
  }

  /**
   * Determina si la ventana de edición expiró
   */
  private isEditWindowExpired(session: Session): boolean {
    const expiresAt =
      new Date(session.created_at).getTime() +
      this.EDIT_WINDOW_MINUTES * 60_000;

    return Date.now() > expiresAt;
  }
}
