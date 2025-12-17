import { IsString } from 'class-validator';

export class CreateAddendumDto {
  @IsString()
  sessionId: string;

  @IsString()
  content: string;

  @IsString()
  reason: string;
}