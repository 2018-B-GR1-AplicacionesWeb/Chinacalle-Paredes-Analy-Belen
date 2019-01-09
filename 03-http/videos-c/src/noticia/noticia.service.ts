import {Injectable} from "@nestjs/common";
import {NoticiaEntity} from "./noticia.entity";
import {InjectRepository} from '@nestjs/typeorm';
import {FindManyOptions, Repository} from "typeorm";
import {Noticia} from "../app.controller";

@Injectable()
export class NoticiaS {
    arreglo: Noticia[] = [
        {
            id:1,
            titulo: 'A',
            descripcion: 'asdfghjkl'
        },
        {
            id:2,
            titulo: 'B',
            descripcion: 'asdfghjkl'
        },
        {
            id:3,
            titulo: 'C',
            descripcion: 'asdfghjkl'
        },
        {
            id:4,
            titulo: 'D',
            descripcion: 'asdfghjkl'
        }
    ];
    numeroRegistro = 5;
    constructor(
        @InjectRepository(NoticiaEntity)
        private readonly _noticiaRepository: Repository<NoticiaEntity>,
    ){}
    buscar(parametrosBusqueda?: FindManyOptions<NoticiaEntity>): Promise<NoticiaEntity[]>{
        return this._noticiaRepository.find(parametrosBusqueda)
    }

    crear(noticia: Noticia): Promise<NoticiaEntity>{
        //create es un contructor de la entidad
        const noticiaEntity: NoticiaEntity = this._noticiaRepository.create(noticia);
        //save guarda en la BDD
        return this._noticiaRepository.save(noticiaEntity); //devuelve un json de la noticia

        /*noticia.id= this.numeroRegistro;
        this.numeroRegistro++;
        this.arreglo.push(noticia);
        return noticia
        */
    }
    eliminar(idNoticia: number): Promise<NoticiaEntity>{
        const noticiaAEliminar = this._noticiaRepository.create({id:idNoticia});
        return this._noticiaRepository.remove(noticiaAEliminar);

        /*
        const indiceNoticia= this.arreglo
            .findIndex(
                (noticia)=> {
                    return noticia.id === idNoticia
                }
            );
        const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]));
        this.arreglo.splice(indiceNoticia,1);
        return registroEliminado;
        */
    }

    actualizar( nuevaNoticia: Noticia): Promise<NoticiaEntity>{

        const noticiaEntity: NoticiaEntity = this._noticiaRepository.create(nuevaNoticia);

        return this._noticiaRepository.save(noticiaEntity);
        /*
        const noticia= this.buscarPorId(idNoticia);
        const indiceNoticia = noticia.id;
        this.arreglo[indiceNoticia] = nuevaNoticia;
        return this.arreglo[indiceNoticia];
        */
    }
    buscarPorId(idNoticia: number): Promise<NoticiaEntity>{
        return this._noticiaRepository.findOne(idNoticia);
        /*
        const indiceNoticia= this.arreglo
            .findIndex(
                (noticia)=> {
                    return noticia.id === idNoticia
                }
            );
        return this.arreglo[indiceNoticia]

        */
    }
}