import { DataSource } from 'typeorm';
import { AuditLog } from './entities/audit.entity';
import { constants } from '../constants/constants';

export const auditProviders = [
  {
    provide: constants.auditRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AuditLog),
    inject: [constants.dataSource],
  },
];