import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto, @Request() req) {
    return this.sessionsService.create(
      createSessionDto,
      req.user.sub,
    );
  }

  @Get('patient/:patientId')
  findAllByPatient(
    @Param('patientId') patientId: string,
    @Request() req,
  ) {
    return this.sessionsService.findAllByPatient(
      patientId,
      req.user.sub,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.sessionsService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
    @Request() req,
  ) {
    return this.sessionsService.update(
      id,
      updateSessionDto,
      req.user.sub,
    );
  }

  @Patch(':id/lock')
  lockSession(@Param('id') id: string, @Request() req) {
    return this.sessionsService.lockSession(id, req.user.sub);
  }
}
