import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionAttachmentsController } from './session-attachments.controller';
import { SessionAttachmentsService } from './session-attachments.service';

import { SessionAttachment } from './entities/session-attachment.entity';
import { Session } from '../sessions/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SessionAttachment,
      Session, // 👈 ESTO ES LO QUE FALTABA
    ]),
  ],
  controllers: [SessionAttachmentsController],
  providers: [SessionAttachmentsService],
})
export class SessionAttachmentsModule {}
