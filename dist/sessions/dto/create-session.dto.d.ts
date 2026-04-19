import { VitalSignsDto } from './vital-signs.dto';
import { KinesicPlanDto } from './kinesic-plan.dto';
export declare class CreateSessionDto {
    patientId: string;
    content: string;
    importantEvents?: string;
    vitalSigns?: VitalSignsDto;
    diagnosis?: string;
    prescription?: string;
    studies?: string;
    kinesicPlan?: KinesicPlanDto;
    evolution?: string;
}
