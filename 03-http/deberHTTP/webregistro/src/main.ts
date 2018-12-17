import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *as httpserver from 'http-server';
import * as ejs from 'ejs';

console.log(httpserver);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

    app.set('view engine', 'ejs'); //IMPORTANTE
}

bootstrap();
