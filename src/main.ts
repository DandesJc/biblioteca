import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true})
  );

  const config = new DocumentBuilder()
    .setTitle('Sistema de Biblioteca')
    .setDescription('API para administración de usuarios, materiales y préstamos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
