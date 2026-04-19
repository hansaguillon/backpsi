import { Patient } from '../../patients/entities/patient.entity';
import { User } from '../../users/entities/user.entity';
export interface TrainingExercise {
    id: string;
    name: string;
    sets: string;
    reps: string;
    rest: string;
    notes: string;
}
export interface TrainingDay {
    id: string;
    label: string;
    exercises: TrainingExercise[];
}
export declare class ExercisePlan {
    id: string;
    patientId: string;
    patient: Patient;
    createdBy: string;
    creator: User;
    title: string;
    daysPerWeek: number;
    days: TrainingDay[];
    observations?: string;
    status: 'active' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}
