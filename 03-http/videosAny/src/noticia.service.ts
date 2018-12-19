import {Injectable} from "@nestjs/common";
import {Noticia} from "./app.controller";

@Injectable()
export class NoticiaService{
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
    crear(noticia: Noticia){
        noticia.id= this.numeroRegistro;
        this.numeroRegistro++;
        this.arreglo.push(noticia);
        return noticia
    }
    eliminar(idNoticia: number){
        const indiceNoticia= this.arreglo
            .findIndex(
                (noticia)=> {
                    return noticia.id === idNoticia
                }
            );
        const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]));
        this.arreglo.splice(indiceNoticia,1);
        return registroEliminado;
    }

    actualizar(idNoticia: number, nuevaNoticia: Noticia){
        const noticia= this.buscarPorId(idNoticia);
        const indiceNoticia = noticia.id;
        this.arreglo[indiceNoticia] = nuevaNoticia;
        return this.arreglo[indiceNoticia];
    }
    buscarPorId(idNoticia: number): Noticia{
        const indiceNoticia= this.arreglo
            .findIndex(
                (noticia)=> {
                    return noticia.id === idNoticia
                }
            );
        return this.arreglo[indiceNoticia]
    }
}