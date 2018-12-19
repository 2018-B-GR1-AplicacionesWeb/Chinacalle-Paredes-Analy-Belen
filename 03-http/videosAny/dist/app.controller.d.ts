import { AppService } from './app.service';
import { Observable } from "rxjs";
import { Request } from "express-serve-static-core";
import { Response } from "express";
import { NoticiaService } from "./noticia.service";
export declare class AppController {
    private readonly _appService;
    private readonly _noticiaService;
    numeroRegistro: number;
    constructor(_appService: AppService, _noticiaService: NoticiaService);
    raiz(todosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPost(response: any): void;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoAsync(): Promise<string>;
    adiosMundoObservable(): Observable<string>;
    crearUSuario(usuario: Usuario, nombre: string, cabeceras: any, codigo: any, res: Response, req: Request | any): void;
    inicio(response: any, consulta: any, accion: string, titulo: string): void;
    crearNoticiaRuta(response: any): void;
    crearNoticiaFunction(response: any, noticia: Noticia): void;
    eliminar(response: any, idNoticia: string): void;
    actualizarNoticiaVista(response: any, idNoticia: string): void;
    actualizarNoticiaMetodo(response: any, idNoticia: string, noticia: Noticia): void;
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo?: string;
    descripcion?: string;
}
