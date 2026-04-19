import { Session } from '../../sessions/entities/session.entity';
export declare class Patient {
    id: string;
    firstName: string;
    lastName: string;
    dni: string;
    birthDate: Date;
    phone: string;
    email?: string;
    admissionDate: Date;
    referralSource?: string;
    billingId?: string;
    consultReason?: string;
    treatmentNotes?: string;
    status: 'active' | 'inactive';
    dischargeDate?: Date;
    dischargeReason?: string;
    createdAt: Date;
    updatedAt: Date;
    sessions: Session[];
}
