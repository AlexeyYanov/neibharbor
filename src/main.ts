import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { MyLogger } from './logger/MyLogger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express'; 

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {logger: new MyLogger()});
  app.enableCors(
    {
      origin: ['http://localhost:5000','http://localhost:3000'], // Укажите домен вашего клиента
      credentials: true, 
    }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");
  app.use(cookieParser());
  app.use(express.static('build'));
  await app.listen(process.env.APP_PORT, () =>
    console.log('Server started on port ' + process.env.APP_PORT),
  );
}
bootstrap();
