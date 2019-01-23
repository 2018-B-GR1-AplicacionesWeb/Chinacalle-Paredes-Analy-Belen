import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ejs from 'ejs'; //npm install
import * as session from 'express-session';
import * as fileSession from 'session-file-store';
import * as express from 'express';
//(import express = require('express');

const FileStore = fileSession(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
      session({
          secret: 'Secreto',
          resave: false,
          saveUnitilialized: true,
          cookie: {secure: false},
          name: 'server-session-id',  //filesession
          store: new FileStore()  //filesession
      })
  );



  app.set('view engine', 'ejs');

  app.use(express.static('publico'));
    //localhost:3000/texto.txt
    //comentario sin
    await app.listen(3000);
}
bootstrap();
