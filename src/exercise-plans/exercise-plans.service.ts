import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExercisePlan } from './entities/exercise-plan.entity';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { UpdateExercisePlanDto } from './dto/update-exercise-plan.dto';

@Injectable()
export class ExercisePlansService {
  constructor(
    @InjectRepository(ExercisePlan)
    private readonly repo: Repository<ExercisePlan>,
  ) {}

  async create(dto: CreateExercisePlanDto, userId: string): Promise<ExercisePlan> {
    const plan = this.repo.create({
      patientId: dto.patientId,
      createdBy: userId,
      title: dto.title ?? 'Rutina de Ejercicios',
      daysPerWeek: dto.daysPerWeek,
      days: dto.days,
      observations: dto.observations,
    });
    return this.repo.save(plan);
  }

  async findByPatient(patientId: string): Promise<ExercisePlan[]> {
    return this.repo.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ExercisePlan> {
    const plan = await this.repo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException('Plan de ejercicios no encontrado');
    return plan;
  }

  async update(id: string, dto: UpdateExercisePlanDto): Promise<ExercisePlan> {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.repo.save(plan);
  }

  async archive(id: string): Promise<ExercisePlan> {
    const plan = await this.findOne(id);
    plan.status = 'archived';
    return this.repo.save(plan);
  }
}
