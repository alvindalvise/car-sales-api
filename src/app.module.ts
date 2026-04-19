import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { VehiculosModule } from './vehiculos/vehiculo.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { CuotasModule } from './cuotas/cuotas.module';

@Module({
  imports: [
    DatabaseModule,
    ClientesModule,
    VehiculosModule,
    SolicitudesModule,
    CuotasModule,
  ],
})
export class AppModule {}
