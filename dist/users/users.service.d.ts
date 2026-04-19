import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuditService } from '../audit/audit.service';
export declare class UsersService {
    private readonly usersRepository;
    private readonly auditService;
    constructor(usersRepository: Repository<User>, auditService: AuditService);
    findOne(id: string): Promise<User>;
    update(id: string, dto: UpdateUserDto, actor: {
        sub: string;
    }): Promise<User>;
}
