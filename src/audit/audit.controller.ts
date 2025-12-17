import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(@Request() req) {
    return this.auditService.findAll(req.user.sub);
  }

  @Get('range')
  findByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Request() req,
  ) {
    return this.auditService.findByDateRange(
      req.user.sub,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('entity')
  findByEntity(
    @Query('type') entityType: string,
    @Query('id') entityId: string,
    @Request() req,
  ) {
    return this.auditService.findByEntity(
      req.user.sub,
      entityType,
      entityId,
    );
  }
}
