import { OnModuleInit } from '@nestjs/common';
export declare class BackupService implements OnModuleInit {
    private readonly logger;
    private readonly backupDir;
    onModuleInit(): Promise<void>;
    private ensureBackupDir;
    createBackup(): Promise<{
        success: boolean;
        filename?: string;
        error?: string;
    }>;
    listBackups(): Promise<string[]>;
    private cleanOldBackups;
}
