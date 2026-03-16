import { IsOptional, IsString, IsNumber } from 'class-validator';

export class VitalSignsDto {
  @IsOptional() @IsString()  bloodPressure?: string;
  @IsOptional() @IsNumber()  heartRate?: number;
  @IsOptional() @IsNumber()  temperature?: number;
  @IsOptional() @IsNumber()  weight?: number;
  @IsOptional() @IsNumber()  height?: number;
  @IsOptional() @IsNumber()  oxygenSaturation?: number;
  @IsOptional() @IsNumber()  respiratoryRate?: number;
}
