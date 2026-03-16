import { IsOptional, IsString } from 'class-validator';

export class KinesicPlanDto {
  @IsOptional() @IsString()  exercises?: string;
  @IsOptional() @IsString()  repetitions?: string;
  @IsOptional() @IsString()  frequency?: string;
  @IsOptional() @IsString()  recommendations?: string;
}
