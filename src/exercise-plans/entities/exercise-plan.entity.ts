import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
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

@Entity('exercise_plans')
export class ExercisePlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'patient_id' })
  patientId: string;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ length: 255, default: 'Rutina de Ejercicios' })
  title: string;

  @Column({ name: 'days_per_week', type: 'tinyint', unsigned: true, default: 3 })
  daysPerWeek: number;

  @Column({ type: 'json' })
  days: TrainingDay[];

  @Column({ type: 'text', nullable: true })
  observations?: string;

  @Column({
    type: 'enum',
    enum: ['active', 'archived'],
    default: 'active',
  })
  status: 'active' | 'archived';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
