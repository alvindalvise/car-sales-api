import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {

  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto) {
    const { marca, modelo, ano, precio, disponible } = createVehiculoDto;
    const result = await this.sequelize.query(
      `EXEC sp_InsertarVehiculo @marca=:marca, @modelo=:modelo, @año=:ano, @precio=:precio, @disponible=:disponible`,
      { replacements: { marca, modelo, ano, precio, disponible: disponible ?? true } }
    );
    return result[0];
  }

  async findAll() {
    const result = await this.sequelize.query(`EXEC sp_ObtenerVehiculos`);
    return result[0];
  }

  async findOne(id: number) {
    const result = await this.sequelize.query(
      `EXEC sp_ObtenerVehiculoPorId @Id_Vehiculo=:id`,
      { replacements: { id } }
    );
    return result[0];
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    const { marca, modelo, ano, precio, disponible } = updateVehiculoDto;
    const result = await this.sequelize.query(
      `EXEC sp_ActualizarVehiculo @Id_Vehiculo=:id, @marca=:marca, @modelo=:modelo, @año=:ano, @precio=:precio, @disponible=:disponible`,
      { replacements: { id, marca, modelo, ano, precio, disponible } }
    );
    return result[0];
  }

  async remove(id: number) {
    const result = await this.sequelize.query(
      `EXEC sp_EliminarVehiculo @Id_Vehiculo=:id`,
      { replacements: { id } }
    );
    return result[0];
  }
}