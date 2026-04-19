import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateVehiculoDto {

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsNumber()
  ano: number;

  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  disponible?: boolean;
}