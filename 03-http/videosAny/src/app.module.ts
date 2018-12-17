import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia.service";

@Module({
  imports: [], //MODULOS
  controllers: [AppController], //Controllers
  providers: [
      AppService,
      NoticiaService], //Servicios
})
export class AppModule {}
