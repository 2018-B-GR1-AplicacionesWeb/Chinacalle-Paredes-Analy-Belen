import {
    Get,
    Controller,
    Res,
    Query,
    Post,
    Body,
    Param,
    InternalServerErrorException,
    HttpCode,
    Session
} from '@nestjs/common';
import { AppService } from './app.service';
import {NoticiaS} from "./noticia/noticia.service";
import {Observable, of} from "rxjs";
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _noticiaService_: NoticiaS,
              private readonly _usuarioService_: UsuarioService
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

    @Get() // http://ip:puerto
    // @Get('crear')
    // http://localhost:3000/usuario/crear?nombre=Adrian
    @HttpCode(204) // status
    raiz(
        @Query() todosQueryParams: any,  //{nombre:"Adrian"}
        @Query('nombre') nombre: string, // adrian
    ): string {
        console.log(todosQueryParams);
        return 'Hola Mundo' + nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario')  // PARAMETRO RUTA
    // http://localhost:3000/usuario/segmentoUno/segmentoDos/10
    parametroRuta(
        @Param('idUsuario') id
    ) {
        return id;
    }

    @Get('adiosMundo') // url
    adiosMundo(): string {
        return 'Adios mundo'
    }

    @Post('adiosMundo') // url
    adiosMundoPOST(
        @Res() response,
    ) {
        response.render(
            'inicio',
            {
                usuario: 'Adrian',
                arreglo: [],
                booleano: true,
            }
        );
    }

    @Get('adiosMundoPromesa') // url
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('Adios Mundo');
                }
            )
        };
        return promesaAdios();
    }


    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoAsync() {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'Error servidor'})
        }

    }

    @Get('adiosMundoObservable') // url
    adiosMundoObservable(): Observable<string> {
        const respuesta$ = of('Adios Mundo');
        return respuesta$;
    }

    @Get('login')
    mostrarLogin(
      @Res() request
    ){
      request.render('login')
    }
    @Post('login')
    @HttpCode(200)
    async ejecutarLogin(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion
    ){
      const respuesta = await this._usuarioService_
          .autenticar(username,password);

      if(respuesta){
          sesion.usuario = username;
          res.send('ok');
      }else{
          res.redirect('login')
      }
    }

    @Get('logout')
    logout(
        @Res() res,
        @Session() sesion
    ) {
        sesion.username = undefined;
        sesion.destroy();
        res.redirect('login');
    }


}
export interface Usuario {
    nombre: string;
    //
}
export interface Noticia {
    id?: number;
    titulo?: string;
    descripcion?: string;
}