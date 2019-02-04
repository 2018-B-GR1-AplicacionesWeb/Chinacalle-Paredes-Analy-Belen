import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaS} from "./noticia/noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaModule} from "./noticia/noticia.module";
import {NoticiaEntity} from "./noticia/noticia.entity";
import {ArticuloEntity} from "./articulo/articulo.entity";
import {PaginaEntity} from "./pagina/pagina.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          //host: 192.168.99.100 ,
          host: 'localhost',
          port: 32775,
          username: 'root',
          password: 'root',
          database: 'web',
          synchronize: true,
          dropSchema: false,  //false cuando ya se acaben de hacer las entidades!!!!!!
          entities:[
              NoticiaEntity,
              PaginaEntity,
              ArticuloEntity,
              UsuarioEntity
          ]
      }),
      NoticiaModule,
      UsuarioModule
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService], //Servicios
})
export class AppModule {}
