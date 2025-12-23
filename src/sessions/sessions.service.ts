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

@Injectable()
export class SessionsService {
  private readonly EDIT_WINDOW_MINUTES = 10;

  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
    private readonly patientsService: PatientsService,
  ) {}

  /* ===================== CREATE ===================== */
  async create(dto: CreateSessionDto): Promise<Session> {
    await this.patientsService.findOne(dto.patientId);

    const session = this.sessionsRepository.create({
      patientId: dto.patientId,
      content: dto.content,
      importantEvents: dto.importantEvents,
      attachments: dto.attachments ?? [],
      is_locked: false,
    });

    return this.sessionsRepository.save(session);
  }

  /* ===================== FIND BY PATIENT ===================== */
  async findAllByPatient(patientId: string): Promise<Session[]> {
    await this.patientsService.findOne(patientId);

    return this.sessionsRepository.find({
      where: { patientId },
      relations: ['addenda'],
      order: { created_at: 'DESC' },
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

    await this.checkAndLockSession(session);

    return session;
  }

  /* ===================== UPDATE ===================== */
  async update(
    id: string,
    dto: UpdateSessionDto,
  ): Promise<Session> {
    const session = await this.findOne(id);

    if (session.is_locked) {
      throw new ForbiddenException(
        'Sesión bloqueada. Use una adenda.',
      );
    }

    if (this.isEditWindowExpired(session)) {
      session.is_locked = true;
      session.locked_at = new Date();
      await this.sessionsRepository.save(session);

      throw new ForbiddenException(
        'Ventana de edición expirada. Use una adenda.',
      );
    }

    session.content = dto.content ?? session.content;
    session.importantEvents =
      dto.importantEvents ?? session.importantEvents;
    session.attachments =
      dto.attachments ?? session.attachments;

    return this.sessionsRepository.save(session);
  }

  /* ===================== LOCK ===================== */
  async lockSession(id: string): Promise<Session> {
    const session = await this.findOne(id);

    if (!session.is_locked) {
      session.is_locked = true;
      session.locked_at = new Date();
      await this.sessionsRepository.save(session);
    }

    return session;
  }

  /* ===================== HELPERS ===================== */
  private async checkAndLockSession(session: Session) {
    if (session.is_locked) return;

    if (this.isEditWindowExpired(session)) {
      session.is_locked = true;
      session.locked_at = new Date();
      await this.sessionsRepository.save(session);
    }
  }

  private isEditWindowExpired(session: Session): boolean {
    const expiresAt =
      new Date(session.created_at).getTime() +
      this.EDIT_WINDOW_MINUTES * 60_000;

    return Date.now() > expiresAt;
  }
}
