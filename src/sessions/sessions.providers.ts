import { DataSource } from 'typeorm';
import { Session } from './entities/session.entity';
import { constants } from '../constants/constants';

export const sessionsProviders = [
  {
    provide: constants.sessionRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Session),
    inject: [constants.dataSource],
  },
];