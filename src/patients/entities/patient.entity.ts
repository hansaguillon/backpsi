import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ unique: true, length: 20 })
  dni: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ length: 50, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ type: 'date' })
  admission_date: Date;

  @Column({ length: 255, nullable: true })
  referral_source: string;

  @Column({ length: 20, nullable: true })
  billing_id: string;

  @Column({ type: 'text', nullable: true })
  consult_reason: string;

  @Column({ type: 'text', nullable: true })
  treatment_notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Session, (session) => session.patient)
  sessions: Session[];
}
