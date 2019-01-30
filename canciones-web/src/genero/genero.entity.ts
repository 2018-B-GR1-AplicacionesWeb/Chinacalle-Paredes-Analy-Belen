import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DescripcionGeneroEntity} from "../descripcion-genero/descripcion-genero.entity";
import {DiscoEntity} from "../disco/disco-entity";

@Entity('genero')
export class GeneroEntity {
    @PrimaryGeneratedColumn()
    idLista: number;

    @OneToMany(
        type => DescripcionGeneroEntity,
        descripciongenero => descripciongenero.genero
    )
    descripciongeneros: DescripcionGeneroEntity[];

    @ManyToOne(
        type => DiscoEntity,
        disco => disco.generos
    )
    disco: DiscoEntity




}