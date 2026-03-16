import { Injectable } from '@nestjs/common';
import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {

  async create(createVehiculoDto: CreateVehiculoDto) {
    return await Vehiculo.create(createVehiculoDto as any);
  }

  async findAll() {
    return await Vehiculo.findAll();
  }

  async findOne(id: number) {
    return await Vehiculo.findByPk(id);
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return null;

    return await vehiculo.update(updateVehiculoDto as any);
  }

  async remove(id: number) {
    const vehiculo = await Vehiculo.findByPk(id);
    if (!vehiculo) return null;

    await vehiculo.destroy();
    return { message: 'Vehiculo eliminado correctamente' };
  }
}
