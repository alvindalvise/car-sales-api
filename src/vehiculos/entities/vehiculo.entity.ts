import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'VEHICULO',
  timestamps: false,
})
export class Vehiculo extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  Id_Vehiculo: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  marca: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  modelo: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'año'
  })
  ano: number;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  precio: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  disponible: boolean;
}