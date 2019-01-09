import {Module} from "@nestjs/common";
import {NoticiaController} from "./noticia.controller";
import {NoticiaS} from "./noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia.entity";
@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                [
                    NoticiaEntity
                ]
            )
        ],
        controllers:[
            NoticiaController
        ],
        providers: [
            NoticiaS
        ],
        exports: [
            NoticiaS
        ]//Servicios o modulos --> no se crean más instancias
    }
)
export class NoticiaModule{

}

/*
SERVICIO SOLO INSTANCIA DE 1 CLASE --> SOLO IMPORTAR UNA VEZ
SINGLETON
 */