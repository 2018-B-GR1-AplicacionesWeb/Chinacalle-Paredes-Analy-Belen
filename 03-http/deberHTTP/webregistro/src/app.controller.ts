import {Get, Controller, Res, Post, Body, Param, HttpCode, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {CancionService} from "./cancion.service";

@Controller()
export class AppController {
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

  constructor(private readonly appService: AppService,
              private readonly _cancionService: CancionService) {};

  @Get()
  raices(
      @Res() nada,
  ){
      return this.appService.root();
  }
    @Get()    //Con esto se indica que el método se ejecuta cuando se haga un request con metodo get
    @HttpCode(200) //status
    raiz(
        @Query() todosQueryParams: any,   //{nombre: Analy}
        @Query('nombre') nombre: string, //analy
    ): string {
        console.log(todosQueryParams);
        return 'Hola Metrocida '+nombre;
    }


  @Get('inicio')
    inicio(
        @Res() response,
  ){
      response.render(
          'inicio',
          {
              canciones: this.canciones,
              booleano: false
          }
      )
  }

  @Get('crear-cancion')
    crearCancionRuta(
        @Res() response
  ){
      response.render(
          'crear-cancion'
      )
  }

  @Post('crear-cancion')
    crearCancionFuncion(
        @Res() response,
        @Body() cancion: Cancion
  ){
      const respuesta = this._cancionService.crear(cancion);

      response.redirect('/inicio');
      return respuesta
  }

  @Post('eliminar/nombreCancion')
    eliminar(
        @Res() response,
        @Param() nombreCancion: string
  ){
      this._cancionService.eliminar(nombreCancion).then(
          (base)=>{
              console.log(JSON.stringify(base));
          }
      );
      response.redirect('/inicio')
  }

  @Post('actualizar/nombreCancion')
    actualizar(
        @Res() response,
        @Param() nombreCancion: string,
        @Body() nuevaCancion: Cancion
  ){
      this._cancionService.actualizar(nombreCancion, nuevaCancion)
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