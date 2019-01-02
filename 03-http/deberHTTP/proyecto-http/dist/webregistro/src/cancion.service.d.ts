import { Base, Cancion } from "./app.controller";
export declare class CancionService {
    NOMBRE_BD: string;
    listar(): Promise<Base>;
    crear(cancion: Cancion): Promise<any>;
    eliminar(nombreCancion: string): Promise<any>;
    actualizar(nombreCancion: string, nuevaCancion: Cancion): Promise<any>;
}
