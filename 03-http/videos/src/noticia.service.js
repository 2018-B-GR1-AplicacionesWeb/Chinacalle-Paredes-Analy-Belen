var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@nestjs/common";
let NoticiaService = class NoticiaService {
    constructor() {
        this.arreglo = [
            {
                id: 1,
                titulo: 'A',
                descripcion: 'asdfghjkl'
            },
            {
                id: 2,
                titulo: 'B',
                descripcion: 'asdfghjkl'
            },
            {
                id: 3,
                titulo: 'C',
                descripcion: 'asdfghjkl'
            },
            {
                id: 4,
                titulo: 'D',
                descripcion: 'asdfghjkl'
            }
        ];
        this.numeroRegistro = 5;
    }
    crear(noticia) {
        noticia.id = this.numeroRegistro;
        this.numeroRegistro++;
        this.arreglo.push(noticia);
        return noticia;
    }
    eliminar(idNoticia) {
        const indiceNoticia = this.arreglo
            .findIndex((noticia) => {
            return noticia.id === idNoticia;
        });
        const registroEliminado = JSON.parse(JSON.stringify(this.arreglo[indiceNoticia]));
        this.arreglo.splice(indiceNoticia, 1);
        return registroEliminado;
    }
    actualizar(idNoticia, nuevaNoticia) {
        const indiceNoticia = this.arreglo
            .findIndex((noticia) => {
            return noticia.id === idNoticia;
        });
        this.arreglo[indiceNoticia] = nuevaNoticia;
        return this.arreglo[indiceNoticia];
    }
};
NoticiaService = __decorate([
    Injectable()
], NoticiaService);
export { NoticiaService };
