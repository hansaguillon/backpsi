import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  /* =====================
     Datos de admisión
     ===================== */

  @IsDateString()
  admissionDate: string;

  @IsOptional()
  @IsString()
  referralSource?: string;

  @IsOptional()
  @IsString()
  billingId?: string;

  /* =====================
     Motivo / tratamiento
     ===================== */

  @IsOptional()
  @IsString()
  consultReason?: string;

  @IsOptional()
  @IsString()
  treatmentNotes?: string;
}
