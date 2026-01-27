import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AuditLog } from '../../audit/entities/audit.entity';
import { Addendum } from '../../addenda/entities/addendum.entity';

export type UserRole = 'psychologist' | 'doctor' | 'kinesiologist';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ name: 'password_hash', length: 255 })
  password_hash: string;

  @Column({ length: 200 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['psychologist', 'doctor', 'kinesiologist'],
    default: 'psychologist',
  })
  role: UserRole;

  @Column({ name: 'last_login', type: 'datetime', nullable: true })
  last_login?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => AuditLog, (audit) => audit.user)
  auditLogs: AuditLog[];

  @OneToMany(() => Addendum, (addendum) => addendum.createdByUser)
  addenda: Addendum[];
}
