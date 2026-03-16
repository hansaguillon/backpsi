export const BACKUP_CONFIG = {
  mysql: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'clinical_db',
    mysqldumpPath: process.env.MYSQLDUMP_PATH ?? 'mysqldump',
  },
  backups: {
    directory: 'backups',
    keepLast: 10,
  },
};