import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VitalSignsDto } from './vital-signs.dto';
import { KinesicPlanDto } from './kinesic-plan.dto';

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
  @IsOptional() @ValidateNested() @Type(() => VitalSignsDto)
  vitalSigns?: VitalSignsDto;

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
  @IsOptional() @ValidateNested() @Type(() => KinesicPlanDto)
  kinesicPlan?: KinesicPlanDto;

  @IsOptional()
  @IsString()
  evolution?: string;
}
