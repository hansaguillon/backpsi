import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addendum } from './entities/addendum.entity';
import { CreateAddendumDto } from './dto/create-addendum.dto';
import { AuditService } from '../audit/audit.service';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class AddendaService {
  constructor(
    @InjectRepository(Addendum)
    private readonly addendaRepository: Repository<Addendum>,
    private readonly auditService: AuditService,
    private readonly sessionsService: SessionsService,
  ) {}

  /* ===================== CREATE ===================== */
  async create(
    dto: CreateAddendumDto,
    userId: string,
  ): Promise<Addendum> {
    // Verificar que la sesión exista y esté válida
    await this.sessionsService.findOne(dto.sessionId);

    const addendum = this.addendaRepository.create({
      session_id: dto.sessionId,
      content: dto.content,
      reason: dto.reason,
      created_by: userId,
    });

    const saved = await this.addendaRepository.save(addendum);

    await this.auditService.log(
      userId,
      'CREATE',
      'ADDENDUM',
      saved.id,
      'Se creó una adenda',
    );

    return saved;
  }

  /* ===================== FIND BY SESSION ===================== */
  async findAllBySession(
    sessionId: string,
    userId: string,
  ): Promise<Addendum[]> {
    await this.sessionsService.findOne(sessionId);

    return this.addendaRepository.find({
      where: { session_id: sessionId },
      order: { created_at: 'ASC' },
    });
  }

  /* ===================== FIND ONE ===================== */
  async findOne(
    id: string,
    userId: string,
  ): Promise<Addendum> {
    const addendum = await this.addendaRepository.findOne({
      where: { id },
      relations: ['session'],
    });

    if (!addendum) {
      throw new NotFoundException(
        `Adenda con ID ${id} no encontrada`,
      );
    }

    // Validar sesión asociada
    await this.sessionsService.findOne(addendum.session_id);

    return addendum;
  }
}
