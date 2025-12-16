import { DataSource } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { constants } from '../constants/constants';

export const patientsProviders = [
  {
    provide: constants.patientRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Patient),
    inject: [constants.dataSource],
  },
];