import { Base, Cancion } from "./app.controller";
export declare class CancionService {
    NOMBRE_BD: string;
    promesaLeer: () => Promise<Base>;
    leerPromesa(): Promise<Cancion[]>;
}
