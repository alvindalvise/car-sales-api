import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan algo extra
      transform: true, // transforma tipos automáticamente
    }),
  );

  // Opcional pero recomendado (para frontend futuro)
  app.enableCors();

  await app.listen(3000);

  console.log(' Servidor corriendo en http://localhost:3000');
}

bootstrap();
