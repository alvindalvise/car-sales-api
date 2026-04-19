import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudesService.create(createSolicitudDto);
  }

  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudesService.findOne(+id);
  }

  @Put(':id/aprobar')
  aprobar(@Param('id') id: string) {
    return this.solicitudesService.aprobar(+id);
  }

  @Put(':id/rechazar')
  rechazar(@Param('id') id: string) {
    return this.solicitudesService.rechazar(+id);
  }
}
