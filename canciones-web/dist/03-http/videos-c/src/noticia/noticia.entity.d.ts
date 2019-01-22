import { PaginaEntity } from "../pagina/pagina.entity";
export declare class NoticiaEntity {
    id: number;
    titulo: string;
    descripcion: string;
    paginas: PaginaEntity[];
    primerConsole(): void;
    segundoConsole(): void;
}
