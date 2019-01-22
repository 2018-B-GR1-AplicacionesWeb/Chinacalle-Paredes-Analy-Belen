import { CancionEntity } from "./cancion-entity";
import { FindManyOptions, Repository } from "typeorm";
import { Cancion } from "../app.controller";
export declare class CancionService {
    private readonly _cancionRepository;
    constructor(_cancionRepository: Repository<CancionEntity>);
    buscar(parametrosBusqueda?: FindManyOptions<CancionEntity>): Promise<CancionEntity[]>;
    crear(cancion: Cancion): Promise<CancionEntity>;
    eliminar(idCancion: number): Promise<CancionEntity>;
    actualizar(nuevaCancion: Cancion): Promise<CancionEntity>;
    buscarPorId(idCancion: number): Promise<CancionEntity>;
}
