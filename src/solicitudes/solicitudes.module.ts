import { Module } from '@nestjs/common';
import { SolicitudesController } from './solicitudes.controller';
import { SolicitudesService } from './solicitudes.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
})
export class SolicitudesModule {}
