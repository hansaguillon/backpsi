import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SessionAttachment } from './entities/session-attachment.entity';
import { Session } from '../sessions/entities/session.entity';

@Injectable()
export class SessionAttachmentsService {
  constructor(
    @InjectRepository(SessionAttachment)
    private readonly attachmentsRepository: Repository<SessionAttachment>,

    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
  ) {}

  /* =====================
     ADD MANY ATTACHMENTS
     ===================== */
  async addMany(
    sessionId: string,
    files: {
      url: string;
      originalName: string;
      mimeType: string;
      size: number;
    }[],
  ): Promise<SessionAttachment[]> {

    const session = await this.sessionsRepository.findOne({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    if (session.isLocked) {
      throw new ForbiddenException(
        'La sesión está bloqueada. No se pueden adjuntar archivos.',
      );
    }

    const attachments = files.map((file) =>
      this.attachmentsRepository.create({
        sessionId,
        url: file.url,
        originalName: file.originalName,
        mimeType: file.mimeType,
        size: file.size,
      }),
    );

    return this.attachmentsRepository.save(attachments);
  }

  /* =====================
     FIND BY SESSION
     ===================== */
  async findBySession(
    sessionId: string,
  ): Promise<SessionAttachment[]> {
    return this.attachmentsRepository.find({
      where: { sessionId },
      order: { createdAt: 'ASC' },
    });
  }
}
