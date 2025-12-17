import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto,RegisterDto } from './dto/login.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly auditService: AuditService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { username: registerDto.username },
    });

    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = this.usersRepository.create({
      username: registerDto.username,
      name: registerDto.name,
      password_hash: passwordHash,
    });

    await this.usersRepository.save(user);

    await this.auditService.log(
      user.id,
      'CREATE',
      'SYSTEM',
      user.id,
    );

    return user; // password_hash excluido automáticamente
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(
      loginDto.password,
      user.password_hash,
    );
  

    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    user.last_login = new Date();
    await this.usersRepository.save(user);

    await this.auditService.log(
      user.id,
      'LOGIN',
      'SYSTEM',
      user.id,
    );

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
  access_token: this.jwtService.sign(payload, {
    secret: 'mi_clave_super_secreta', // clave fija aquí
    expiresIn: '5h', // opcional, define expiración
  }),
  user: {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  },
};
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }
}
