import { DataSource } from 'typeorm';
import { Addendum } from './entities/addendum.entity';
import { constants } from '../constants/constants';

export const addendaProviders = [
  {
    provide: constants.addendumRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Addendum),
    inject: [constants.dataSource],
  },
];