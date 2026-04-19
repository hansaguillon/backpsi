export declare const BACKUP_CONFIG: {
    mysql: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        mysqldumpPath: string;
    };
    backups: {
        directory: string;
        keepLast: number;
    };
};
