import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateSessionDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  importantEvents?: string;

  @IsOptional()
  @IsArray()
  attachments?: string[];
}