import { IsString, IsOptional, IsEmail, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  dni: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsDateString()
  admissionDate: string;

  @IsOptional()
  @IsString()
  referralSource?: string;

  @IsOptional()
  @IsString()
  billingId?: string;

  @IsOptional()
  @IsString()
  consultReason?: string;

  @IsOptional()
  @IsString()
  treatmentNotes?: string;
}
