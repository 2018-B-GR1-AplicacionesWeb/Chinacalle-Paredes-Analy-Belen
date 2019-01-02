import { AppService } from '03-http/deberHTTP/segundo-intento/src/app.service';
import { CancionService } from "03-http/deberHTTP/segundo-intento/src/cancion.service";
export declare class AppController {
    private readonly appService;
    private readonly _cancionService;
    constructor(appService: AppService, _cancionService: CancionService);
    root(): string;
    inicio(response: any, accion: string, nombre: string): void;
}
export interface Autor {
    idAutor?: number;
    nombre: string;
}
export interface Cancion {
    idCancion?: number;
    nombre: string;
    autor: Autor;
    anio: number;
}
export interface Base {
    canciones: Cancion[];
}
