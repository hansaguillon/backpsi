import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import * as cron from 'node-cron';
import { BACKUP_CONFIG } from './backup.config';

const execAsync = promisify(exec);

@Injectable()
export class BackupService implements OnModuleInit {
  private readonly logger = new Logger(BackupService.name);
  private readonly backupDir = path.join(
    process.cwd(),
    BACKUP_CONFIG.backups.directory,
  );

  onModuleInit() {
    this.ensureBackupDir();

    cron.schedule(BACKUP_CONFIG.backups.cron, () => {
      this.logger.log('Ejecutando backup automático');
      this.createBackup();
    });

    this.logger.log('Sistema de backups inicializado');
  }

  private ensureBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      this.logger.log(`Directorio creado: ${this.backupDir}`);
    }
  }

  async createBackup(): Promise<{ success: boolean; filename?: string; error?: string }> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql.gz`;
    const filepath = path.join(this.backupDir, filename);

    const { host, port, user, password, database, mysqldumpPath } =
      BACKUP_CONFIG.mysql;

    const command = `"${mysqldumpPath}" -h ${host} -P ${port} -u ${user} -p${password} ${database} | gzip > "${filepath}"`;

    try {
      await execAsync(command, { shell: 'cmd.exe' });

      const stats = fs.statSync(filepath);
      if (stats.size < 1024) {
        throw new Error('Backup creado pero archivo inválido');
      }

      this.logger.log(`Backup exitoso: ${filename}`);
      await this.cleanOldBackups();

      return { success: true, filename };
    } catch (error: any) {
      this.logger.error('Error creando backup', error.message);
      return { success: false, error: error.message };
    }
  }

  async listBackups(): Promise<string[]> {
    return fs
      .readdirSync(this.backupDir)
      .filter(f => f.endsWith('.sql.gz'))
      .sort()
      .reverse();
  }

  private async cleanOldBackups() {
    const backups = await this.listBackups();
    const toDelete = backups.slice(BACKUP_CONFIG.backups.keepLast);

    for (const file of toDelete) {
      fs.unlinkSync(path.join(this.backupDir, file));
      this.logger.log(`Backup eliminado: ${file}`);
    }
  }
}
