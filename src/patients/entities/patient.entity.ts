import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';

@Entity('patients')
@Index('idx_dni', ['dni'])
@Index('idx_last_name', ['lastName'])
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* =======================
     Datos personales
     ======================= */

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ length: 20, unique: true })
  dni: string;

  @Column({
    name: 'birth_date',
    type: 'date',
  })
  birthDate: Date;

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 150, nullable: true })
  email?: string;

  /* =======================
     Datos de admisión
     ======================= */

  @Column({
    name: 'admission_date',
    type: 'date',
  })
  admissionDate: Date;

  @Column({
    name: 'referral_source',
    length: 255,
    nullable: true,
  })
  referralSource?: string;

  @Column({
    name: 'billing_id',
    length: 50,
    nullable: true,
  })
  billingId?: string;

  /* =======================
     Historia clínica
     ======================= */

  @Column({
    name: 'consult_reason',
    type: 'text',
    nullable: true,
  })
  consultReason?: string;

  @Column({
    name: 'treatment_notes',
    type: 'text',
    nullable: true,
  })
  treatmentNotes?: string;

  /* =======================
     Auditoría
     ======================= */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /* =======================
     Relaciones
     ======================= */

  @OneToMany(() => Session, (session) => session.patient)
  sessions: Session[];
}
