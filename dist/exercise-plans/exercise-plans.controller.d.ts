import { ExercisePlansService } from './exercise-plans.service';
import { CreateExercisePlanDto } from './dto/create-exercise-plan.dto';
import { UpdateExercisePlanDto } from './dto/update-exercise-plan.dto';
export declare class ExercisePlansController {
    private readonly service;
    constructor(service: ExercisePlansService);
    create(dto: CreateExercisePlanDto, req: any): Promise<import("./entities/exercise-plan.entity").ExercisePlan>;
    findByPatient(patientId: string): Promise<import("./entities/exercise-plan.entity").ExercisePlan[]>;
    findOne(id: string): Promise<import("./entities/exercise-plan.entity").ExercisePlan>;
    update(id: string, dto: UpdateExercisePlanDto): Promise<import("./entities/exercise-plan.entity").ExercisePlan>;
    archive(id: string): Promise<import("./entities/exercise-plan.entity").ExercisePlan>;
}
