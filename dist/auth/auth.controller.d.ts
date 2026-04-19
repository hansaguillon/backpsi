import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, req: Request): Promise<import("../users/entities/user.entity").User>;
    login(loginDto: LoginDto, req: Request): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            name: string;
            role: import("../users/entities/user.entity").UserRole;
        };
    }>;
}
