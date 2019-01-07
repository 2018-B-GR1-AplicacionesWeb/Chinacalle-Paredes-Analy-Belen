import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "../../videos-c/src/noticia/noticia-entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 32771,
          username: 'root',
          password: 'root',
          database: 'web',
          entities: [
              NoticiaEntity
          ],
          synchronize: true
      })
  ], //MODULOS un modulo tiene controladores y servicios
  controllers: [AppController], //Controllers
  providers: [
      AppService,
      NoticiaService], //Servicios
})
export class AppModule {}
