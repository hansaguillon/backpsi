import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExercisePlansService } from './exercise-plans.service';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { UpdateExercisePlanDto } from './dto/update-exercise-plan.dto';

@Controller('exercise-plans')
@UseGuards(JwtAuthGuard)
export class ExercisePlansController {
  constructor(private readonly service: ExercisePlansService) {}

  @Post()
  create(@Body() dto: CreateExercisePlanDto, @Request() req) {
    return this.service.create(dto, req.user.sub);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExercisePlanDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/archive')
  archive(@Param('id') id: string) {
    return this.service.archive(id);
  }
}
