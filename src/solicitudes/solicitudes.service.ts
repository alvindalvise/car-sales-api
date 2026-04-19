import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Injectable()
export class SolicitudesService {

  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto) {
    const { tasaInteres, plazoMeses, montoSolicitado, Id_Usuario, Id_Cliente, Id_Vehiculo, Id_Tipo, Id_Estado } = createSolicitudDto;
    const result = await this.sequelize.query(
      `EXEC sp_InsertarSolicitud 
        @tasaInteres=:tasaInteres, 
        @plazoMeses=:plazoMeses, 
        @montoSolicitado=:montoSolicitado,
        @Id_Usuario=:Id_Usuario,
        @Id_Cliente=:Id_Cliente,
        @Id_Vehiculo=:Id_Vehiculo,
        @Id_Tipo=:Id_Tipo,
        @Id_Estado=:Id_Estado`,
      { replacements: { tasaInteres, plazoMeses, montoSolicitado, Id_Usuario, Id_Cliente, Id_Vehiculo, Id_Tipo, Id_Estado } }
    );
    return result[0];
  }

  async findAll() {
    const result = await this.sequelize.query(`EXEC sp_ObtenerSolicitudes`);
    return result[0];
  }

  async findOne(id: number) {
    const result = await this.sequelize.query(
      `EXEC sp_ObtenerSolicitudPorId @Id_Solicitud=:id`,
      { replacements: { id } }
    );
    return result[0];
  }

  async aprobar(id: number) {
    await this.sequelize.query(
      `UPDATE SOLICITUD SET Id_Estado = 2 WHERE Id_Solicitud = :id`,
      { replacements: { id } }
    );
    return { message: 'Solicitud aprobada correctamente' };
  }

  async rechazar(id: number) {
    await this.sequelize.query(
      `UPDATE SOLICITUD SET Id_Estado = 3 WHERE Id_Solicitud = :id`,
      { replacements: { id } }
    );
    return { message: 'Solicitud rechazada correctamente' };
  }
}