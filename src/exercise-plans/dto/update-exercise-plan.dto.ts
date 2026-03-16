import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateExercisePlanDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  daysPerWeek?: number;

  @IsOptional()
  @IsArray()
  days?: any[];

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @IsEnum(['active', 'archived'])
  status?: 'active' | 'archived';
}
