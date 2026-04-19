import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CuotasService {

  constructor(
    @Inject('SEQUELIZE') private sequelize: Sequelize
  ) {}

  async findAll() {
    const result = await this.sequelize.query(`EXEC sp_ObtenerCuotasPorSolicitud @Id_Solicitud=1`);
    return result[0];
  }

  async findBySolicitud(idSolicitud: number) {
    const result = await this.sequelize.query(
      `EXEC sp_ObtenerCuotasPorSolicitud @Id_Solicitud=:id`,
      { replacements: { id: idSolicitud } }
    );
    return result[0];
  }

  async pagarCuota(idCuota: number) {
    await this.sequelize.query(
      `UPDATE CUOTAS SET Id_Estado = 4 WHERE Id_Cuotas = :id`,
      { replacements: { id: idCuota } }
    );
    return { message: 'Cuota marcada como pagada' };
  }
}