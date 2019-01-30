import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {GeneroEntity} from "../genero/genero.entity";

@Entity('descripcion-genero')
export class DescripcionGeneroEntity {
    @PrimaryGeneratedColumn()
    idGenero: number;

    @Index()
    @Column({
        name: 'nombre-descripcion-genero'
    })
    nombreGenero: number;

    @ManyToOne(
        type => GeneroEntity,
        genero => genero.descripciongeneros
    )
    genero: GeneroEntity

}