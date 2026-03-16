import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Max,
} from 'class-validator';

export class CreateExercisePlanDto {
  @IsUUID()
  patientId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsNumber()
  @Min(1)
  @Max(7)
  daysPerWeek: number;

  @IsArray()
  days: any[];

  @IsOptional()
  @IsString()
  observations?: string;
}
