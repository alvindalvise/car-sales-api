import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {

  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    const { nombreCompleto, cedula, telefono, ingresoMensual } = createClienteDto;
    const result = await this.sequelize.query(
      `EXEC sp_InsertarCliente @nombreCompleto=:nombreCompleto, @cedula=:cedula, @telefono=:telefono, @ingresoMensual=:ingresoMensual`,
      { replacements: { nombreCompleto, cedula, telefono: telefono ?? null, ingresoMensual } }
    );
    return result[0];
  }

  async findAll() {
    const result = await this.sequelize.query(`EXEC sp_ObtenerClientes`);
    return result[0];
  }

  async findOne(id: number) {
    const result = await this.sequelize.query(
      `EXEC sp_ObtenerClientePorId @Id_Cliente=:id`,
      { replacements: { id } }
    );
    return result[0];
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const { nombreCompleto, telefono, ingresoMensual } = updateClienteDto;
    const result = await this.sequelize.query(
      `EXEC sp_ActualizarCliente @Id_Cliente=:id, @nombreCompleto=:nombreCompleto, @telefono=:telefono, @ingresoMensual=:ingresoMensual`,
      { replacements: { id, nombreCompleto, telefono: telefono ?? null, ingresoMensual } }
    );
    return result[0];
  }

  async remove(id: number) {
    const result = await this.sequelize.query(
      `EXEC sp_EliminarCliente @Id_Cliente=:id`,
      { replacements: { id } }
    );
    return result[0];
  }
}