import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {CancionService} from "./cancion.service";
import {CancionEntity} from "./cancion.entity";
import {FindManyOptions, Like} from "typeorm";
import {Cancion} from "../../dist/app.controller";

@Controller('cancion')
export class CancionController {
    constructor(private readonly _cancionService: CancionService){}

    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('busqueda') busqueda: string,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string
    ){
        let mensaje =  undefined;

        if(accion && nombre){
            switch(accion){
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado.`;
                    break;

                case 'crear':
                    mensaje = `Registro ${nombre} creado.`;
                    break;
            }
        }
        let canciones: CancionEntity[];
        
        if (busqueda){
            const consulta: FindManyOptions<CancionEntity> = {
                where:[
                    {
                        nombre: Like(`%${busqueda}`)
                    },
                    {
                        anio: Like(`%${busqueda}%`)
                    }
                ]
            };
            canciones = await this._cancionService.buscar(consulta);
        } else {
            canciones = await this._cancionService.buscar();
        }

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

    @Post('eliminar/:idCancion')
    async eliminar(
        @Res() response,
        @Param('idCancion') idCancion: string
    ){
        const cancion = await this._cancionService.buscarPorId(+idCancion);

        await this._cancionService.eliminar(Number(idCancion));
        const parametrosConsulta = `?accion=borrar&titulo=${
            cancion.nombre
            }`;
        response.redirect('cancion/inicio'+ parametrosConsulta)
    }

    @Get('crear-cancion')
    crearcancionRuta(
        @Res() response
    ){
        response.render('crear-cancion')
    }

    @Post('crear-cancion')
    crearcancionFuncion(
        @Res() response,
        @Body() cancion: Cancion
    ){
        const respuesta = this._cancionService.crear(cancion);
        const parametrosConsulta = `?accion=crear&titulo=${cancion.nombre}`;

        response.redirect('cancion/inicio'+ parametrosConsulta)
    }




}