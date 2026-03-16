import { Injectable, Inject } from '@nestjs/common';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {

  

  async create(createClienteDto: CreateClienteDto) {
  return await Cliente.create(createClienteDto as any);
}

  async findAll() {
    return await Cliente.findAll();
  }

  async findOne(id: number) {
    return await Cliente.findByPk(id);
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;

    return await cliente.update({ ...updateClienteDto });
  }

  async remove(id: number) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;

    await cliente.destroy();
    return { message: 'Cliente eliminado correctamente' };
  }
}
