import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSolicitudDto {

  @IsNumber()
  @IsNotEmpty()
  tasaInteres: number;

  @IsNumber()
  @IsNotEmpty()
  plazoMeses: number;

  @IsNumber()
  @IsNotEmpty()
  montoSolicitado: number;

  @IsNumber()
  @IsNotEmpty()
  Id_Usuario: number;

  @IsNumber()
  @IsNotEmpty()
  Id_Cliente: number;

  @IsNumber()
  @IsNotEmpty()
  Id_Vehiculo: number;

  @IsNumber()
  @IsNotEmpty()
  Id_Tipo: number;

  @IsNumber()
  @IsNotEmpty()
  Id_Estado: number;
}