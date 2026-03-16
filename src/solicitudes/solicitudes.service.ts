import { Injectable, Inject } from '@nestjs/common';
import { Solicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Injectable()
export class SolicitudesService {

  constructor(
    @Inject('SEQUELIZE') private readonly sequelize: any,
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto) {
    return await Solicitud.create(createSolicitudDto as any);
  }

  async findAll() {
    return await Solicitud.findAll();
  }

  async findOne(id: number) {
    return await Solicitud.findByPk(id);
  }

  async aprobar(idSolicitud: number) {

    // Cambiar estado a Aprobada
    await this.sequelize.query(`
      UPDATE Solicitudes
      SET Estado = 'Aprobada'
      WHERE IdSolicitud = :id
    `, {
      replacements: { id: idSolicitud },
    });

    // Aquí podrías llamar un SP si lo tienes
    // await this.sequelize.query(`EXEC sp_GenerarCuotas :id`, { replacements: { id: idSolicitud } });

    return { message: 'Solicitud aprobada correctamente' };
  }

  async rechazar(idSolicitud: number) {
    await this.sequelize.query(`
      UPDATE Solicitudes
      SET Estado = 'Rechazada'
      WHERE IdSolicitud = :id
    `, {
      replacements: { id: idSolicitud },
    });

    return { message: 'Solicitud rechazada correctamente' };
  }
}
