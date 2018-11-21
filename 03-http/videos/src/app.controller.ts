import {
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    Headers, UnauthorizedException, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {async} from "rxjs/internal/scheduler/async";
import {Observable, of} from "rxjs";
import {Request} from "express-serve-static-core";
import {Response} from "express";
//COntrolador gestiona Request y Response
@Controller()   //decorador   --> @nombre(paréntesis)   Es una función
export class AppController {
  constructor(private readonly _appService: AppService) {} //NO ES UN CONSTRUCTOR

    //http://ip:puerto
  @Get()    //Con esto se indica que el método se ejecuta cuando se haga un request con metodo get
  @HttpCode(200) //status
  raiz(
      @Query() todosQueryParams: any,   //{nombre: Analy}
      @Query('nombre') nombre: string, //analy
  ): string {
      console.log(todosQueryParams);
    return 'Hola Metrocida'+nombre;
  }
  @Get('segmentoUno/segmentoDos/:idUsuario')    //Parametro ruta
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

    @Post('crearUsuario')
    crearUSuario(
        @Body() usuario: Usuario,
        @Body('nombre') nombre:string,
        @Headers() cabeceras,     //Es lo que manda el cliente Cabeceras de peticion
        @Headers('seguridad')codigo, // Cabecera de peticion
        @Res() res: Response,      //Si se usa ya no usar nest
        @Req() req: Request| any,
    ){
        //crear usuario
        console.log('Cookies: ',req.cookies);   //LEIDO
        console.log('Cookies seguras ',req.signedCookies);
        console.log(usuario);
        console.log(cabeceras);

      if(codigo ==='1234'){
          const bdd = this._appService.crearUsuario(usuario);
          res.append('token', '5678');

          res.cookie('app', 'web'); //INSEGURA

          res.cookie("segura", "secreto",{
              signed:true
          });
          res.json(bdd);
//          return 'ok';
      }else{
          throw new UnauthorizedException({
              mensaje: 'Error de autorización',
              error:   401
          })
      }

    }
}

export interface Usuario {
    nombre: string;
    //
}
