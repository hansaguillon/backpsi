export const BACKUP_CONFIG = {
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'juan2983A!',
    database: 'clinical_db',
    mysqldumpPath: 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe',
  },
  backups: {
    directory: 'backups',
    keepLast: 10,
  },
};