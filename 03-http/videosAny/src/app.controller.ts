
import {
    Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    Headers, UnauthorizedException, Req, Res,
} from '@nestjs/common';
import { AppService } from './app.service';
//import {async} from "rxjs/internal/scheduler/async";
import {Observable, of} from "rxjs";
import {Request} from "express-serve-static-core";
import {Response} from "express";
import {NoticiaService} from "./noticia.service";
//COntrolador gestiona Request y Response
@Controller()   //decorador   --> @nombre(paréntesis)   Es una función
export class AppController {
    numeroRegistro = 5;
  constructor(private readonly _appService: AppService,
              private readonly _noticiaService: NoticiaService) {} //NO ES UN CONSTRUCTOR
//constructor es la forma de inyectar dependencias
    //http://ip:puerto
  @Get()    //Con esto se indica que el método se ejecuta cuando se haga un request con metodo get
  @HttpCode(200) //status
  raiz(
      @Query() todosQueryParams: any,   //{nombre: Analy}
      @Query('nombre') nombre: string, //analy
  ): string {
      console.log(todosQueryParams);
    return 'Hola Metrocida '+nombre;
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
  adiosMundoPost(
      @Res() response
  ) {
      response.render(
          'inicio',
          {
              usuario: 'Analy',
              arreglo: [],
              booleano: true
          }
      )
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
      const respuesta2$ = of('adios Mundo');
      return respuesta2$;
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

@Get('inicio')
    inicio(
        @Res() response,
        @Query() consulta,
        @Query('accion') accion: string,
        @Query('titulo') titulo: string
){
      let mensaje= undefined;
      if(accion &&titulo ){
          switch (accion) {
              case 'borrar':
                  mensaje = `Registro ${titulo} eliminado`;
          }
      }
      response.render(
          'inicio',
          {
              usuario: 'Analy',
              arreglo: this._noticiaService.arreglo,
              booleano: false,
              amansaje: mensaje
          }
      )
}
    @Get('crear-noticia')
    crearNoticiaRuta(
        @Res() response
    ){
        response.render(
            'crear-noticia'
        )
    }
    @Post('crear-noticia')
    crearNoticiaFunction(
        @Res() response,
        @Body() noticia: Noticia
    ){
        this._noticiaService.crear(noticia);

        response.redirect('/inicio')
    }

//Todos los parametros que llegan de ruta son de tipo string
@Post('eliminar/:idNoticia')
    eliminar(
        @Res() response,
        @Param('idNoticia') idNoticia: string,

    ){
      const noticiaBorrada=
      this._noticiaService.eliminar(Number(idNoticia));
      response.redirect('/inicio')
  }

  @Get('actualizar-noticia/:idNoticia')
  actualizarNoticiaVista(
      @Res() response,
      @Param('idNoticia') idNoticia: string
  ){
      const noticiaEncontrada = this._noticiaService.buscarPorId(+idNoticia); //El + transforma a número
      response.render(
          'crear-noticia',
          {
              noticia: noticiaEncontrada
          }
      )
  }
  @Post('actualizar-noticia/:idNoticia')
    actualizarNoticiaMetodo(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
        @Body() noticia: Noticia
  ){
      noticia.id = +idNoticia;
      this._noticiaService.actualizar(+idNoticia,noticia);
      response.redirect('inicio');
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

/////////////////////       CONSULTA
/*
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: '',
    templateUrl: './abc.html',
    styleUrls: ['./abc.less']
})
export class AbcComponent implements OnInit {
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        // get param
        let param1 = this.route.snapshot.queryParams["param1"];
    }
}

*/