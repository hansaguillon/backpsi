import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Addendum } from '../../addenda/entities/addendum.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'patient_id' })
  patientId: string;

  @Column('text')
  content: string;

  @Column({ name: 'important_events', type: 'text', nullable: true })
  importantEvents?: string;

  @Column({ type: 'json', nullable: true })
  attachments?: any;

  /* =======================
     Campos médicos
     ======================= */

  @Column({ name: 'vital_signs', type: 'json', nullable: true })
  vitalSigns?: any;

  @Column({ length: 500, nullable: true })
  diagnosis?: string;

  @Column({ type: 'text', nullable: true })
  prescription?: string;

  @Column({ type: 'text', nullable: true })
  studies?: string;

  /* =======================
     Kinesiología
     ======================= */

  @Column({ name: 'kinesic_plan', type: 'json', nullable: true })
  kinesicPlan?: any;

  @Column({ type: 'text', nullable: true })
  evolution?: string;

  /* =======================
     Bloqueo legal
     ======================= */

  @Column({ name: 'is_locked', default: false })
  isLocked: boolean;

  @Column({ name: 'locked_at', type: 'datetime', nullable: true })
  lockedAt?: Date;

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

  @ManyToOne(() => Patient, (patient) => patient.sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @OneToMany(() => Addendum, (addendum) => addendum.session)
  addenda: Addendum[];
}
