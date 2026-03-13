import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
  ) {}

  /* =====================
     FIND ALL
     ===================== */
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.sessionsService.findAll();
  }

  /* =====================
     CREATE
     ===================== */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() dto: CreateSessionDto,
    @Request() req,
  ) {
    return this.sessionsService.create(dto, req.user);
  }

  /* =====================
     FIND BY PATIENT
     ===================== */
  @Get('patient/:patientId')
  @HttpCode(HttpStatus.OK)
  findAllByPatient(
    @Param('patientId') patientId: string,
  ) {
    return this.sessionsService.findAllByPatient(patientId);
  }

  /* =====================
     FIND ONE
     ===================== */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  /* =====================
     UPDATE
     ===================== */
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSessionDto,
    @Request() req,
  ) {
    return this.sessionsService.update(id, dto, req.user);
  }

  /* =====================
     LOCK MANUAL
     ===================== */
  @Post(':id/lock')
  @HttpCode(HttpStatus.OK)
  lock(@Param('id') id: string) {
    return this.sessionsService.lockSession(id);
  }
}
