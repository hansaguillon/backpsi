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

  /* Campos médicos */
  @IsOptional()
  vitalSigns?: any;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  prescription?: string;

  @IsOptional()
  @IsString()
  studies?: string;

  /* Kinesiología */
  @IsOptional()
  kinesicPlan?: any;

  @IsOptional()
  @IsString()
  evolution?: string;
}
