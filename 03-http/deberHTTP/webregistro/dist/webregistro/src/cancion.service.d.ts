import { Cancion } from "../../proyecto-http/src/app.controller";
export declare class CancionService {
    NOMBRE_BD: string;
    listar(): Promise<string>;
    crear(cancion: Cancion): Promise<any>;
    eliminar(nombreCancion: string): Promise<any>;
    actualizar(nombreCancion: string, nuevaCancion: Cancion): Promise<any>;
}
