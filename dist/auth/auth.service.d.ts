import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { AuditService } from '../audit/audit.service';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly auditService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, auditService: AuditService);
    register(registerDto: RegisterDto, ip?: string): Promise<User>;
    login(loginDto: LoginDto, ip?: string): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
    validateUser(userId: string): Promise<User | null>;
}
