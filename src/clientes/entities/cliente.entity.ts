import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'CLIENTE',
  timestamps: false,
})
export class Cliente extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  Id_Cliente: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  nombreCompleto: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  cedula: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  telefono: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  ingresoMensual: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  fechaRegistro: Date;
}