import {Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {CancionService} from "./cancion.service";
import {CancionEntity} from "./cancion-entity";
import {FindManyOptions, Like} from "typeorm";

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
                    mensaje = `Registro ${nombre} eliminado`
            }
        }
        let canciones: CancionEntity[];
        if (busqueda){
            const consulta: FindManyOptions<CancionEntity> = {
                where:[
                    {
                        nombre: Like(`%${busqueda}`)
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


    }




}