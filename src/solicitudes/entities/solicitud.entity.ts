import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';

@Table({
  tableName: 'SOLICITUD',
  timestamps: false,
})
export class Solicitud extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  Id_Solicitud: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    allowNull: false,
  })
  tasaInteres: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  plazoMeses: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  montoSolicitado: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  fechaSolicitud: Date;

  @ForeignKey(() => Cliente)
  @Column({ type: DataType.INTEGER, allowNull: false })
  Id_Cliente: number;

  @ForeignKey(() => Vehiculo)
  @Column({ type: DataType.INTEGER, allowNull: false })
  Id_Vehiculo: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  Id_Usuario: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  Id_Tipo: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  Id_Estado: number;
}