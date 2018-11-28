import { NestFactory } from '@nestjs/core';
import {AppModule } from './app.module';    //. es para entrar al mismo directorio
//const http_server = require('');  importar javascript
import *as cookieParser from 'cookie-parser';
import *as httpserver from 'http-server';

console.log(httpserver);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(
      'me gustan los tacos', //secreto
      {//opciones
      }
  ));
  await app.listen(3000);   //puerto en el que se levanta el servidor
}
bootstrap();
