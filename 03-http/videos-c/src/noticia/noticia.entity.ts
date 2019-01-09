//  BDD Ya existe --> synchonize: false
//  BDD No existe --> synchonize: true

import {BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PaginaEntity} from "../pagina/pagina.entity";
@Entity('noticia')
export class NoticiaEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Index()
    // @ts-ignore
    @Column({
        name: 'titulo_noticia',
        type: "varchar",
        length: 50
    })
    titulo: string;

    @Column({
        name:'descripcion_noticia',
        type: "varchar",
        length: 250
    })
        //auxxxxiliiiarr
    descripcion: string;

    @OneToMany(
     type => PaginaEntity,  // con qué tabla se va a relacionar
     pagina => pagina.noticia //Campo que hace referencia --> Foreign Key
    )
    paginas: PaginaEntity[];

    @BeforeInsert()
    primerConsole(){
        console.log('Primer console');
    }

    @BeforeInsert()
    segundoConsole(){
        console.log(`El titulo es: ${this.titulo}`)
    }
}