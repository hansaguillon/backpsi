import { VitalSignsDto } from './vital-signs.dto';
import { KinesicPlanDto } from './kinesic-plan.dto';
export declare class UpdateSessionDto {
    content?: string;
    importantEvents?: string;
    attachments?: string[];
    vitalSigns?: VitalSignsDto;
    diagnosis?: string;
    prescription?: string;
    studies?: string;
    kinesicPlan?: KinesicPlanDto;
    evolution?: string;
}
