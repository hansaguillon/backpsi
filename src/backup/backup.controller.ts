import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('backup')
@UseGuards(JwtAuthGuard)
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post()
  async createBackup() {
    return this.backupService.createBackup();
  }

  @Get()
  async listBackups() {
    return this.backupService.listBackups();
  }
}
