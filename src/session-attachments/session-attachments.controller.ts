import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SessionAttachmentsService } from './session-attachments.service';

@Controller('sessions/:sessionId/attachments')
@UseGuards(JwtAuthGuard)
export class SessionAttachmentsController {
  constructor(
    private readonly attachmentsService: SessionAttachmentsService,
  ) {}

  /* =====================
     ADD ATTACHMENTS (METADATA ONLY)
     ===================== */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addAttachments(
    @Param('sessionId') sessionId: string,
    @Body()
    body: {
      files: {
        url: string;
        originalName: string;
        mimeType: string;
        size: number;
      }[];
    },
  ) {

    return this.attachmentsService.addMany(
      sessionId,
      body.files,
    );
  }

  /* =====================
     LIST ATTACHMENTS
     ===================== */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('sessionId') sessionId: string,
  ) {
    return this.attachmentsService.findBySession(sessionId);
  }
}
