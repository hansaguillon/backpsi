import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session } from 'src/sessions/entities/session.entity';

@Entity('session_attachments')
export class SessionAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* =======================
     Relación sesión
     ======================= */

  @Column('uuid', { name: 'session_id' })
  sessionId: string;

  @ManyToOne(
    () => Session,
    (session) => session.attachments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'session_id' })
  session: Session;

  /* =======================
     Metadata del archivo
     ======================= */

  @Column({ length: 500 })
  url: string;

  @Column({ name: 'original_name', length: 255 })
  originalName: string;

  @Column({ name: 'mime_type', length: 100 })
  mimeType: string;

  @Column('int')
  size: number;

  /* =======================
     Auditoría
     ======================= */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
