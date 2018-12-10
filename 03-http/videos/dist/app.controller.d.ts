import { AppService } from './app.service';
import { Observable } from "rxjs";
import { Request } from "express-serve-static-core";
import { Response } from "express";
export declare class AppController {
    private readonly _appService;
    constructor(_appService: AppService);
    raiz(todosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPost(): string;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoAsync(): Promise<string>;
    adiosMundoObservable(): Observable<string>;
    crearUSuario(usuario: Usuario, nombre: string, cabeceras: any, codigo: any, res: Response, req: Request | any): void;
}
export interface Usuario {
    nombre: string;
}
