import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['CREATE', 'EDIT', 'LOCK', 'ADDENDUM', 'ACCESS', 'LOGIN', 'LOGOUT'] })
  action: string;

  @Column({ type: 'enum', enum: ['PATIENT', 'SESSION', 'ADDENDUM', 'SYSTEM'] })
  entity_type: string;

  @Column('uuid')
  entity_id: string;

  @Column({ type: 'text' })
  details: string;

  @Column('uuid')
  user_id: string;

  @Column({ length: 45, nullable: true })
  ip_address: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.auditLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

