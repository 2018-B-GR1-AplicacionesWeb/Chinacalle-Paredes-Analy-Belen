
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const nombreBD= 'canciones.json';

export function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDPromesa());

    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBDD: RespuestaBDD) => {
                    if (respuestaLeerBDD.bdd) {
                        // truty / {}
                        return rxjs.of(respuestaLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBD())
                    }
                }
            )
        );
}

export function leerBDPromesa(){
    // @ts-ignore
    return new Promise(
        (resolve) => {
            fs.writeFile(
                nombreBD,
                'utf-8',
                (error, contenidoLeido) => {
                    if(error){
                        resolve({bdd:null})
                    }
                    else{
                        resolve({bdd: JSON.parse(contenidoLeido)})
                    }
                }
            )
        }
    );
}

export function crearBD() {
    const base = '{"canciones": []}';
    // @ts-ignore
    return new Promise(
        (resolve,reject) => {
            fs.readFile(
                nombreBD,
                base,
                (err) => {
                    if(err){
                        reject({Mensaje: 'error creando Base', error: 500});
                    }else {
                        resolve({Mensaje: 'Base creada', bdd: JSON.parse(base)});
                    }
                }
            )
        }
    )
}

export function guardarBase(bdd: BaseDeDatos) {
    // @ts-ignore
    return new Promise(
        (resolve,reject)=> {
            fs.writeFile(
            nombreBD,
            JSON.stringify(bdd,null,2),
            (error) => {
                if(error){
                    reject({Mensaje: 'error guardando', error: 500});
                } else {
                    resolve({Mensaje: 'Base uardada'});
                }
            }
            )
        }
    )
}
export function buscarCancionNombre(){

}

interface Cancion {
    nombre: string;
    autor: string;
    anio: number;
}

interface BaseDeDatos {
    canciones: [];
}
interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar'
}

interface RespuestaUsuario {
    respuestaUsuario: OpcionesPregunta,
    respuestaBDD: RespuestaBDD
    cancion?: Cancion
}