import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Addendum } from '../../addenda/entities/addendum.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  patient_id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  important_events: string;

  @Column({ type: 'json', nullable: true })
  attachments: string[];

  @Column({ default: false })
  is_locked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  locked_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Patient, (patient) => patient.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @OneToMany(() => Addendum, (addendum) => addendum.session)
  addenda: Addendum[];
}
