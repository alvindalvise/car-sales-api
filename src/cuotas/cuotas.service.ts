import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CuotasService {

  constructor(
    @Inject('SEQUELIZE') private readonly sequelize: any,
  ) {}

  async findAll() {
    return await this.sequelize.query(`
      SELECT * FROM vw_CuotasDetalle
    `);
  }

  async findBySolicitud(idSolicitud: number) {
    return await this.sequelize.query(`
      SELECT * FROM vw_CuotasDetalle
      WHERE IdSolicitud = :id
    `, {
      replacements: { id: idSolicitud },
    });
  }

  async pagarCuota(idCuota: number) {
    await this.sequelize.query(`
      UPDATE Cuotas
      SET IdEstadoCuota = (
        SELECT IdEstadoCuota FROM EstadosCuota WHERE NombreEstado = 'Pagada'
      )
      WHERE IdCuota = :id
    `, {
      replacements: { id: idCuota },
    });

    return { message: 'Cuota marcada como pagada' };
  }
}
