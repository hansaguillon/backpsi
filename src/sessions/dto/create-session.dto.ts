import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  patientId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  importantEvents?: string;

  @IsOptional()
  @IsArray()
  attachments?: string[];
}
