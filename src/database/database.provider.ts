import { Sequelize } from 'sequelize-typescript';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Solicitud } from '../solicitudes/entities/solicitud.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: 'LapLENONO-Chan2\\SQLEXPRESS',
        username: 'camila',
        password: '1234',
        database: 'Venta_VehiculoDB',
        dialectOptions: {
          options: {
            encrypt: false,
            trustServerCertificate: true,
          },
        },
        models: [Cliente, Vehiculo, Solicitud],
      });

      await sequelize.authenticate();
      console.log('✅ Conectado a Venta_VehiculoDB');
      return sequelize;
    },
  },
];