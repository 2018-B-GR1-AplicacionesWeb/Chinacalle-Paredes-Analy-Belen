import {Get, Controller, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

    canciones: Cancion[] =[
        {
            "id":1,
            "nombre": "cancion1",
            "autor": {
                "id": 1,
                "nombre": "autor1"
            },
            "anio": "2000"
        },
        {
            "id":2,
            "nombre": "cancion2",
            "autor": {
                "id": 2,
                "nombre": "autor2"
            },
            "anio": "2018"
        },
        {
            "id":3,
            "nombre": "cancion3",
            "autor": {
                "id": 3,
                "nombre": "autor3"
            },
            "anio": "2003"
        },
        {
            "id":4,
            "nombre": "cancion4",
            "autor": {
                "id": 4,
                "nombre": "autor4"
            },
            "anio": "2004"
        }
    ];

  @Get()
  root(): string {
    return this.appService.root();
  }
  @Get('inicio')
    inicio(
        @Res() response
  ){
      response.render(
          'inicio',
          {
              usuario: 'Analy',
              canciones: this.canciones,
              booleano: false
          }
      )
  }
}

export interface Cancion{
    id: number;
    nombre: string;
    autor: Autor;
    anio: string
}
export interface Autor {
    id: number;
    nombre: string;
}
export interface Base {
    canciones: Cancion[]
}
