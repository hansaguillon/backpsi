import { Repository } from 'typeorm';
import { ExercisePlan } from './entities/exercise-plan.entity';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { UpdateExercisePlanDto } from './dto/update-exercise-plan.dto';
export declare class ExercisePlansService {
    private readonly repo;
    constructor(repo: Repository<ExercisePlan>);
    create(dto: CreateExercisePlanDto, userId: string): Promise<ExercisePlan>;
    findByPatient(patientId: string): Promise<ExercisePlan[]>;
    findOne(id: string): Promise<ExercisePlan>;
    update(id: string, dto: UpdateExercisePlanDto): Promise<ExercisePlan>;
    archive(id: string): Promise<ExercisePlan>;
}
