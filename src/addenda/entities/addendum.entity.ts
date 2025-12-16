import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Session } from '../../sessions/entities/session.entity';
import { User } from '../../users/entities/user.entity';

@Entity('addenda')
export class Addendum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  session_id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text' })
  reason: string;

  @Column('uuid')
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Session, (session) => session.addenda, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @ManyToOne(() => User, (user) => user.addenda)
  @JoinColumn({ name: 'created_by' })
  createdByUser: User;
}
