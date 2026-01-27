import { IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsIn(['psychologist', 'doctor', 'kinesiologist'])
  role?: 'psychologist' | 'doctor' | 'kinesiologist';
}
