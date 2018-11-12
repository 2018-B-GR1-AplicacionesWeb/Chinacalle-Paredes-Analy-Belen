import {Get, Controller, HttpCode, InternalServerErrorException, Post, Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {async} from "rxjs/internal/scheduler/async";
import {Observable, of} from "rxjs";
//COntrolador gestiona Request y Response
@Controller()   //decorador   --> @nombre(paréntesis)   Es una función
export class AppController {
  constructor(private readonly appService: AppService) {}

    //http://ip:puerto
  @Get()    //Con esto se indica que el método se ejecuta cuando se haga un request con metodo get
  @HttpCode(200) //status
  raiz(
      @Query() todosQueryParams: any,
      @Query('nombre') nombre: string,
  ): string {
      console.log(todosQueryParams);
    return 'Hola Metrocida'+nombre;
  }
  @Get('segmentoUno/segmentoDos/:idUsuario')
  parametroRuta(
      @Param('idUsuario') id
  ){
      return id;

  }

  @Get('adiosMundo')
  adiosMundo(): string {
      return 'Adios Mundo'
  }

  @Post('adiosMundo')
  adiosMundoPost(): string {
      return 'Adios mundo POST'
  }

  @Get('adiosMundoPromesa')
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve ) => {
                    resolve('AdiosMundo');
                }
            )
        };
        return promesaAdios();
    }

    @Get('adiosMundoAsync')
    @HttpCode(201)      //Si sale bien se envía este codigoooooooooooo
    async adiosMundoAsync(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject ) => {
                    reject('AdiosMundo');
                }
            )
        };
        try{
            const respuesta: string = await promesaAdios();
            return promesaAdios();
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje:'Error servidor'})

        }

    }

    @Get('adiosMundoObservable')
    adiosMundoObservable(): Observable<string>{
      const respuesta$ = of('adios Mundo');
      return respuesta$;
    }

}
