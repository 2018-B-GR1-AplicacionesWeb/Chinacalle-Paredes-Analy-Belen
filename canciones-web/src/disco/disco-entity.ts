import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {GeneroEntity} from "../genero/genero.entity";
import {CancionEntity} from "../cancion/cancion.entity";
import {eliminarCancion} from "../../../01-Javascript/RegistroPromesas/metodosPromesasObservables";

@Entity('disco')
export class DiscoEntity {
    @PrimaryGeneratedColumn()
    idDisco: number;

    @Index()
        @Column({
            name: 'nombre-Disco'
        })
    nombreDisco: string;

    @Index()
    @Column({
        name: 'anio-Disco'
    })
    anioDisco: string;

    @OneToMany(
        type => GeneroEntity,
        genero => genero.disco
    )
    generos: GeneroEntity[];

    @OneToMany(
        type => CancionEntity,
        cancion => cancion.disco
    )
    canciones: CancionEntity[]

}