import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // =========================
  // CREATE
  // =========================
  @Post()
  @HttpCode(HttpStatus.CREATED) // 201
  create(
    @Body() dto: CreatePatientDto,
    @Request() req,
  ) {
    return this.patientsService.create(dto, req.user);
  }

  // =========================
  // FIND ALL
  // =========================
  @Get()
  @HttpCode(HttpStatus.OK) // 200
  findAll() {
    return this.patientsService.findAll();
  }

  // =========================
  // FIND ONE
  // =========================
  @Get(':id')
  @HttpCode(HttpStatus.OK) // 200
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  // =========================
  // UPDATE
  // =========================
  @Patch(':id')
  @HttpCode(HttpStatus.OK) // 200
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
    @Request() req,
  ) {
    return this.patientsService.update(id, dto, req.user);
  }

  // =========================
  // DELETE
  // =========================
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  async remove(
    @Param('id') id: string,
    @Request() req,
  ) {
    await this.patientsService.remove(id, req.user);
  }
}
