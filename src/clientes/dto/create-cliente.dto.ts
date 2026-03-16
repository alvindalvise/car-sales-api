import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateClienteDto {

  @IsString()
  @IsNotEmpty()
  nombreCompleto: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsNumber()
  @IsNotEmpty()
  ingresoMensual: number;
}