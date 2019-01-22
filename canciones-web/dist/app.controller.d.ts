import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): string;
    mostrarLogin(res: any): void;
    autenticar(): void;
}
export interface Usuario {
    nombre: string;
}
export interface Cancion {
    id?: number;
    nombre: string;
}
