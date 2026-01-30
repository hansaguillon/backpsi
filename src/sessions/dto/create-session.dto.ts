import {
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  patientId: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  importantEvents?: string;

  /* =====================
     Adjuntos
     ===================== */



  /* =====================
     Campos médicos
     ===================== */

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

  /* =====================
     Kinesiología
     ===================== */

  @IsOptional()
  kinesicPlan?: any;

  @IsOptional()
  @IsString()
  evolution?: string;
}
