import { Module } from '@nestjs/common';
import {AppController} from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {CancionEntity} from "./cancion/cancion.entity";
import {DescripcionGeneroEntity} from "./descripcion-genero/descripcion-genero.entity";
import {DiscoEntity} from "./disco/disco-entity";
import {GeneroEntity} from "./genero/genero.entity";
import {CancionModule} from "./cancion/cancion.module";


@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 32769,
          database: 'web',
          username: 'root',
          password: 'root',
          synchronize: true,
          dropSchema: true,
          entities: [
              DescripcionGeneroEntity,
              GeneroEntity,
              CancionEntity,
              DiscoEntity,
          ],
      }),
      CancionModule
  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
