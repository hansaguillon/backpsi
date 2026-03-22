import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import * as zlib from 'zlib';
import { BACKUP_CONFIG } from './backup.config';

const execAsync = promisify(exec);
const gzipAsync = promisify(zlib.gzip);

@Injectable()
export class BackupService implements OnModuleInit {
  private readonly logger = new Logger(BackupService.name);
  private readonly backupDir = path.join(
    process.cwd(),
    BACKUP_CONFIG.backups.directory,
  );

  async onModuleInit() {
    this.ensureBackupDir();

    this.logger.log('Backend iniciado → creando backup automático');
    await this.createBackup();
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

    const host     = process.env.DB_HOST     ?? BACKUP_CONFIG.mysql.host;
    const port     = process.env.DB_PORT     ?? BACKUP_CONFIG.mysql.port;
    const user     = process.env.DB_USER     ?? BACKUP_CONFIG.mysql.user;
    const password = process.env.DB_PASSWORD ?? BACKUP_CONFIG.mysql.password;
    const database = process.env.DB_NAME     ?? BACKUP_CONFIG.mysql.database;
    const mysqldumpPath = process.env.MYSQLDUMP_PATH ?? BACKUP_CONFIG.mysql.mysqldumpPath;

    const tempSql = filepath.replace('.sql.gz', '.tmp.sql');
    const dumpCommand = `"${mysqldumpPath}" -h ${host} -P ${port} -u ${user} -p${password} --result-file="${tempSql}" ${database}`;

    try {
      // Escribe a archivo .sql primero (evita problemas de encoding en stdout de Windows)
      await execAsync(dumpCommand, { shell: 'cmd.exe' });

      const sqlBuffer = fs.readFileSync(tempSql);
      if (sqlBuffer.length < 500) {
        throw new Error('Backup generado pero archivo inválido');
      }

      const compressed = await gzipAsync(sqlBuffer);
      fs.writeFileSync(filepath, compressed);
      fs.unlinkSync(tempSql);

      this.logger.log(`Backup creado al iniciar: ${filename}`);
      await this.cleanOldBackups();

      return { success: true, filename };
    } catch (error: unknown) {
      if (fs.existsSync(tempSql)) fs.unlinkSync(tempSql);
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Error creando backup al iniciar', message);
      return { success: false, error: message };
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
      this.logger.log(`Backup antiguo eliminado: ${file}`);
    }
  }
}
