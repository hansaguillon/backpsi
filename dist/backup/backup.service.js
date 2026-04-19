"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var BackupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const util_1 = require("util");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const zlib = __importStar(require("zlib"));
const backup_config_1 = require("./backup.config");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const gzipAsync = (0, util_1.promisify)(zlib.gzip);
let BackupService = BackupService_1 = class BackupService {
    logger = new common_1.Logger(BackupService_1.name);
    backupDir = path.join(process.cwd(), backup_config_1.BACKUP_CONFIG.backups.directory);
    async onModuleInit() {
        this.ensureBackupDir();
        this.logger.log('Backend iniciado → creando backup automático');
        await this.createBackup();
    }
    ensureBackupDir() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
            this.logger.log(`Directorio creado: ${this.backupDir}`);
        }
    }
    async createBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `backup-${timestamp}.sql.gz`;
        const filepath = path.join(this.backupDir, filename);
        const host = process.env.DB_HOST ?? backup_config_1.BACKUP_CONFIG.mysql.host;
        const port = process.env.DB_PORT ?? backup_config_1.BACKUP_CONFIG.mysql.port;
        const user = process.env.DB_USER ?? backup_config_1.BACKUP_CONFIG.mysql.user;
        const password = process.env.DB_PASSWORD ?? backup_config_1.BACKUP_CONFIG.mysql.password;
        const database = process.env.DB_NAME ?? backup_config_1.BACKUP_CONFIG.mysql.database;
        const mysqldumpPath = process.env.MYSQLDUMP_PATH ?? backup_config_1.BACKUP_CONFIG.mysql.mysqldumpPath;
        const tempSql = filepath.replace('.sql.gz', '.tmp.sql');
        const dumpCommand = `"${mysqldumpPath}" -h ${host} -P ${port} -u ${user} -p${password} --result-file="${tempSql}" ${database}`;
        try {
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
        }
        catch (error) {
            if (fs.existsSync(tempSql))
                fs.unlinkSync(tempSql);
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.logger.error('Error creando backup al iniciar', message);
            return { success: false, error: message };
        }
    }
    async listBackups() {
        return fs
            .readdirSync(this.backupDir)
            .filter(f => f.endsWith('.sql.gz'))
            .sort()
            .reverse();
    }
    async cleanOldBackups() {
        const backups = await this.listBackups();
        const toDelete = backups.slice(backup_config_1.BACKUP_CONFIG.backups.keepLast);
        for (const file of toDelete) {
            fs.unlinkSync(path.join(this.backupDir, file));
            this.logger.log(`Backup antiguo eliminado: ${file}`);
        }
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = BackupService_1 = __decorate([
    (0, common_1.Injectable)()
], BackupService);
//# sourceMappingURL=backup.service.js.map