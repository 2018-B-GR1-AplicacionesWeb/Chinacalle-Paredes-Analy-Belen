import { AppService } from './app.service';
import { CancionService } from "./cancion.service";
export declare class AppController {
    private readonly appService;
    private readonly _cancionService;
    canciones: Cancion[];
    constructor(appService: AppService, _cancionService: CancionService);
    raices(nada: any): string;
    raiz(todosQueryParams: any, nombre: string): string;
    inicio(response: any): void;
    crearCancionRuta(response: any): void;
    crearCancionFuncion(response: any, cancion: Cancion): Promise<any>;
    eliminar(response: any, nombreCancion: string): void;
    actualizar(response: any, nombreCancion: string, nuevaCancion: Cancion): void;
}
export interface Cancion {
    id: number;
    nombre: string;
    autor: Autor;
    anio: string;
}
export interface Autor {
    id: number;
    nombre: string;
}
export interface Base {
    canciones: Cancion[];
}
