import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Noticia} from "../app.controller";
import {NoticiaS} from "./noticia.service";
import {NoticiaEntity} from "./noticia.entity";
import {FindManyOptions, Like} from "typeorm";
import {CreateNoticiaDto} from "./dto/create-noticia.dto";
import {validate, ValidationError} from "class-validator";

@Controller('noticia')
export class NoticiaController{

    constructor(private readonly _noticiaService_: NoticiaS){

    }
    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda,
        @Query('accion') accion: string,
        @Query('titulo') titulo: string
    ){

        let mensaje= undefined;
        let clase = undefined;
        if(accion &&titulo ){
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                    clase = 'alert alert-danger';
                    break;
                case 'actualizar':
                    mensaje = `Registro ${titulo} actualizado`;
                    clase = 'alert alert-info';
                    break;
                case 'crear':
                    mensaje = `Registro ${titulo} creado`;
                    clase = 'alert alert-success';
                    break;
            }
        }
        let noticias: NoticiaEntity[];
        if(busqueda){
            const consulta: FindManyOptions<NoticiaEntity> = {
                where: [
                    {
                        titulo: Like(`%${busqueda}%`)
                    }, //or2
                    {
                        descripcion: Like(`%${busqueda}%`)
                    }
                ]
            };
            //
            noticias = await this._noticiaService_.buscar(consulta);
        }else{
            noticias = await this._noticiaService_.buscar();
        }

        response.render(
            'inicio',
            {
                usuario: 'Analy',
                arreglo: noticias,
                booleano:false,
                mensaje: mensaje,
                clase: clase
            }
        )
    }

    @Get('crear-noticia')
    crearNoticiaRuta(
        @Res() response
    ){
        response.render(
            'crear-noticia',
            {titulo: 'Crear noticia'}
        )
    }
    @Post('crear-noticia')
    async crearNoticia(
        @Res() response,
        @Body() noticia: Noticia
    ){
        const objetoValidacionNoticia = new CreateNoticiaDto();
        objetoValidacionNoticia.titulo = noticia.titulo;
        objetoValidacionNoticia.descripcion = noticia.descripcion;
        const errores: ValidationError[] = await validate(objetoValidacionNoticia);
        const hayErrores = errores.length >0;

        if(hayErrores){
            console.error(errores);
            throw new BadRequestException({mensaje: 'Error de validación en crear noticia'})

        }else{
            await this._noticiaService_.crear(noticia);
            const parametrosConsulta = `?accion=crear&titulo=${
                noticia.titulo
                }`;
            response.redirect('/noticia/inicio'+ parametrosConsulta)
        }
    }

    @Get('actualizar-noticia/:idNoticia')
    async actualizarNoticiaVista(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
    ) {
        // El "+" le transforma en numero a un string
        // numerico
        const noticiaEncontrada = await this._noticiaService_
            .buscarPorId(+idNoticia);

        response
            .render(
                'crear-noticia',
                {
                    noticia: noticiaEncontrada
                }
            )
    }
    @Post('actualizar-noticia/:idNoticia')
    async actualizarNoticiaMetedo(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
        @Body() noticia: Noticia
    ) {
        noticia.id = +idNoticia;  //+string --> cast a number
        await this._noticiaService_.actualizar( noticia);

        const parametrosConsulta = `?accion=actualizar&titulo=${
            noticia.titulo
            }`;

        response.redirect('/noticia/inicio' + parametrosConsulta);

    };
    @Post('eliminar/:idNoticia')
    async eliminar(
        @Res() response,
        @Param('idNoticia') idNoticia: string,
    ) {

        const noticia = await this._noticiaService_.buscarPorId(+idNoticia);
        await this._noticiaService_
            .eliminar(Number(idNoticia));

        const parametrosConsulta = `?accion=borrar&titulo=${
            noticia.titulo
            }`;

        response.redirect('/noticia/inicio' + parametrosConsulta)
    }


}