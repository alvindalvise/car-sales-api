import { Module } from '@nestjs/common';
import { CuotasController } from './cuotas.controller';
import { CuotasService } from './cuotas.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CuotasController],
  providers: [CuotasService],
})
export class CuotasModule {}
