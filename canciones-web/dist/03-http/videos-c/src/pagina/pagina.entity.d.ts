import { NoticiaEntity } from "../noticia/noticia.entity";
import { ArticuloEntity } from "../articulo/articulo.entity";
export declare class PaginaEntity {
    id: number;
    numero: number;
    noticia: NoticiaEntity;
    articulos: ArticuloEntity[];
}
