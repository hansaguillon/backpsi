import { PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsIn,
  IsDateString,
  IsString,
} from 'class-validator';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  /* =======================
     Estado del paciente
     ======================= */

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsDateString()
  dischargeDate?: string;

  @IsOptional()
  @IsString()
  dischargeReason?: string;
}
