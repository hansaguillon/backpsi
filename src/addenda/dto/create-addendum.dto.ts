import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateAddendumDto {
  @IsUUID()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
