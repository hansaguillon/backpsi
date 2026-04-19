import { Patient } from '../../patients/entities/patient.entity';
import { Addendum } from '../../addenda/entities/addendum.entity';
import { SessionAttachment } from '../../session-attachments/entities/session-attachment.entity';
import { VitalSignsDto } from '../dto/vital-signs.dto';
import { KinesicPlanDto } from '../dto/kinesic-plan.dto';
export declare class Session {
    id: string;
    patientId: string;
    patient: Patient;
    content: string;
    importantEvents?: string;
    vitalSigns?: VitalSignsDto;
    diagnosis?: string;
    prescription?: string;
    studies?: string;
    kinesicPlan?: KinesicPlanDto;
    evolution?: string;
    isLocked: boolean;
    lockedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    addenda: Addendum[];
    attachments: SessionAttachment[];
}
