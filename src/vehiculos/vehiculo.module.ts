import { Module } from '@nestjs/common';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiculosController],
  providers: [VehiculosService],
})
export class VehiculosModule {}