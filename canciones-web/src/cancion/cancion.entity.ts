import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DiscoEntity} from "../disco/disco-entity";

@Entity('cancion')
export class CancionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        name: 'nombre-cancion'
    })
    nombre: string;

    @Index()
    @Column({
        name: 'anio-cancion'
    })
    anio: string;

    @ManyToOne(
        type => DiscoEntity,
        disco => disco.canciones
    )
    disco: DiscoEntity;


}