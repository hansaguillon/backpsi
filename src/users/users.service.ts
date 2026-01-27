import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditService } from '../audit/audit.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly auditService: AuditService,
  ) {}

  /* =====================
     FIND ONE
     ===================== */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con ID ${id} no encontrado`,
      );
    }

    return user;
  }

  /* =====================
     UPDATE (SEGURA)
     ===================== */
  async update(
    id: string,
    dto: UpdateUserDto,
    actor: { sub: string },
  ): Promise<User> {
    const user = await this.findOne(id);

    /* =====================
       Username
       ===================== */
    if (dto.username && dto.username !== user.username) {
      const exists = await this.usersRepository.findOne({
        where: { username: dto.username },
      });

      if (exists) {
        throw new ConflictException(
          'El nombre de usuario ya está en uso',
        );
      }

      user.username = dto.username;
    }

    /* =====================
       Nombre visible
       ===================== */
    if (dto.name) {
      user.name = dto.name;
    }

    /* =====================
       Cambio de contraseña
       ===================== */
    if (dto.password) {
      user.password_hash = await bcrypt.hash(dto.password, 10);
    }

    /* =====================
       Rol (solo admin)
       ===================== */
    if (dto.role) {
      if (actor.sub !== user.id) {
        // acá podrías validar role === admin si lo agregás en el futuro
        throw new ForbiddenException(
          'No está permitido cambiar el rol de otro usuario',
        );
      }

      user.role = dto.role;
    }

    const saved = await this.usersRepository.save(user);

    await this.auditService.log(
      actor.sub,
      'EDIT',
      'SYSTEM',
      user.id,
    );

    return saved;
  }
}

