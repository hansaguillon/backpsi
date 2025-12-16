import { DataSource } from 'typeorm';
import { constants } from '../constants/constants';

export const databaseProviders = [
  {
    provide: constants.dataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',      // Cambia si tu usuario es distinto
        password: 'juan2983A!',          // Pon tu contraseña aquí si tienes una
        database: 'clinical_db',
        
        // Esta ruta busca tus entidades en todas las carpetas hermanas dentro de src
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        
        // synchronize: true crea las tablas automáticamente (solo para desarrollo)
        synchronize: true,
        logging: true, // Para ver las consultas SQL en la consola
      });

      return dataSource.initialize();
    },
  },
];