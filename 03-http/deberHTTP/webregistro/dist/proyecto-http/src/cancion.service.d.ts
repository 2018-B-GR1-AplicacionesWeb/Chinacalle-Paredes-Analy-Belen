import { Cancion } from "./app.controller";
export declare class CancionService {
    NOMBRE_BD: string;
    arreglo: Cancion[];
    listar(): Promise<string>;
}
