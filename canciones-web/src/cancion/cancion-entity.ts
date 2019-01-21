import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('cancion')
export class CancionEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Index()
    @Column({
        name: 'nombre_cancion'
    })
    nombre: string;

}