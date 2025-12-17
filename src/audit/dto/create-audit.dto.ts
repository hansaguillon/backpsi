import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum AuditAction {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  LOCK = 'LOCK',
  ADDENDUM = 'ADDENDUM',
  ACCESS = 'ACCESS',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export enum EntityType {
  PATIENT = 'PATIENT',
  SESSION = 'SESSION',
  ADDENDUM = 'ADDENDUM',
  SYSTEM = 'SYSTEM',
}

export class CreateAuditDto {
  @IsEnum(AuditAction)
  action: AuditAction;

  @IsEnum(EntityType)
  entityType: EntityType;

  @IsString()
  entityId: string;

  @IsString()
  details: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}