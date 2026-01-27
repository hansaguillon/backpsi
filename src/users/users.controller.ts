import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* =====================
     PERFIL PROPIO
     ===================== */
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.sub);
    return user; // password_hash ya está excluido por la entity
  }

  /* =====================
     UPDATE PERFIL PROPIO
     ===================== */
  @Patch('me')
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(
      req.user.sub,     // id a modificar
      updateUserDto,    // datos
      req.user,         // actor (el mismo usuario)
    );

    return user;
  }
}
