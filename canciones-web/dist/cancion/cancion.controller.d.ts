import { CancionService } from "./cancion.service";
export declare class CancionController {
    private readonly _cancionService;
    constructor(_cancionService: CancionService);
    inicio(response: any, busqueda: string, accion: string, nombre: string): Promise<void>;
    eliminar(response: any, idCancion: string): Promise<void>;
}
