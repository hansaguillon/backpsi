import { BackupService } from './backup.service';
export declare class BackupController {
    private readonly backupService;
    constructor(backupService: BackupService);
    createBackup(): Promise<{
        success: boolean;
        filename?: string;
        error?: string;
    }>;
    listBackups(): Promise<string[]>;
}
