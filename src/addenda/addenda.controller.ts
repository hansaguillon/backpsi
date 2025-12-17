import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AddendaService } from './addenda.service';
import { CreateAddendumDto } from './dto/create-addendum.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('addenda')
@UseGuards(JwtAuthGuard)
export class AddendaController {
  constructor(private readonly addendaService: AddendaService) {}

  @Post()
  create(@Body() dto: CreateAddendumDto, @Request() req) {
    return this.addendaService.create(dto, req.user.sub);
  }

  @Get('session/:sessionId')
  findAllBySession(
    @Param('sessionId') sessionId: string,
    @Request() req,
  ) {
    return this.addendaService.findAllBySession(sessionId, req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.addendaService.findOne(id, req.user.sub);
  }
}
