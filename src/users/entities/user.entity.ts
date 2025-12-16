import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AuditLog } from '../../audit/entities/audit.entity';
import { Addendum } from '../../addenda/entities/addendum.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'enum', enum: ['psychologist'], default: 'psychologist' })
  role: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => AuditLog, (audit) => audit.user)
  auditLogs: AuditLog[];

  @OneToMany(() => Addendum, (addendum) => addendum.createdByUser)
  addenda: Addendum[];
}
