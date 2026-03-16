import { Controller, Get, Param, Put } from '@nestjs/common';
import { CuotasService } from './cuotas.service';

@Controller('cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Get()
  findAll() {
    return this.cuotasService.findAll();
  }

  @Get('solicitud/:id')
  findBySolicitud(@Param('id') id: string) {
    return this.cuotasService.findBySolicitud(+id);
  }

  @Put(':id/pagar')
  pagarCuota(@Param('id') id: string) {
    return this.cuotasService.pagarCuota(+id);
  }
}
