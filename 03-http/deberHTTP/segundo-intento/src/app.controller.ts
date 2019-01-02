import {Get, Controller, Res, Query} from '@nestjs/common';
import { AppService } from './app.service';
import {CancionService} from "./cancion.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _cancionService: CancionService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

    @Get('inicio')
    inicio(
        @Res()response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string
    ){
        let mensaje = undefined;
        if (accion && nombre){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
            }
        }

        let canciones= undefined;
        // @ts-ignore
        const  arreglo = async (): Cancion[]=>{
            canciones = await this._cancionService.leerPromesa();
            console.log('Canciones: \n'+ JSON.stringify(canciones, null, 2));
        };
        response.render(
            'inicio',
            {
                usuario: 'Analy',
                arreglo: canciones,
                booleano: false,
                mensaje: mensaje
            }
        );
    }


}

export interface Autor {
    idAutor?: number;
    nombre: string;
}
export interface Cancion {
    idCancion?: number;
    nombre: string;
    autor: Autor;
    anio: number;
}
export interface Base {
    canciones: Cancion[]
}
