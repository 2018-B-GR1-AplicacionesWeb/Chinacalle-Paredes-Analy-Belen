

const fs = require('fs');
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const find = require('rxjs/operators').find;

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Imprimir',
    ]
};

const preguntaNuevaCancion = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Nombre de la cancion: '
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Autor de la cancion: '
    },
    {
        type: 'input',
        name: 'anio',
        message: 'Año de la cancion: '
    },
];

const preguntaCancionBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre de la cancion a buscar'
    }
];


const preguntaActualizarCancion = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nuevo nombre de la cancion'
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Escribe el nuevo autor de la cancion'
    },

];

function main(){
    inicializarBase()
        .pipe(
            mergeMap(
                (respuestaBD: RespuestaBDD)=> {
                    return Menu()
                        .pipe(
                            map(
                                (respuesta: OpcionesPregunta) => {
                                    return {
                                        respuestaUsuario: respuesta,
                                        respuestaBD
                                    }
                                }
                            )
                        )
                }
            ),
            mergeMap( //preuntar y devolver observable
                (respuesta: RespuestaCancion) => {
                    switch (respuesta.respuestaCancion.opcionMenu) {
                        case 'Crear':
                            return rxjs
                                .from(inquirer.prompt(preguntaNuevaCancion))
                                .pipe(
                                    map(
                                        (cancion) => {
                                            respuesta.cancion = cancion;
                                            return respuesta
                                        }
                                    )
                                );
                        case 'Buscar':
                            return rxjs
                                .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                                .pipe(
                                    map(
                                        (nombre) => {
                                            respuesta.cancion.nombre= nombre;
                                            const existeCancion = await buscarCancionNombre(respuesta.cancion.nombre);
                                            if(existeCancion){
                                                return existeCancion
                                            }
                                        }
                                    )
                                );
                        case 'Actualizar':
                            return rxjs
                                .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                                .pipe(

                                );
                        default:
                            respuesta.cancion = {
                                nombre: null,
                                autor: null,
                                anio: null
                            };
                            rxjs.of(respuesta)

                    }
                }
            ),
            map(//dependiendo de la opcion seleccionada y los datos Actuar!! no devuelve observable
                (respuesta: RespuestaCancion) => {
                    console.log('respuesta en accion', respuesta);
                    switch (respuesta.respuestaCancion.opcionMenu) {
                        case 'Crear':
                            const cancionNueva = respuesta.cancion;
                            respuesta.respuestaBDD.bdd.canciones.push(cancionNueva)
                            return respuesta;
                        case 'Buscar':
                            const respuestaF = respuesta.cancion;
                            return respuestaF;

                    }
                }

            ), // Guardar Base de Datos
            mergeMap(
                (respuesta: RespuestaCancion) => {
                    return guardarBase(respuesta.respuestaBDD.bdd);
                }
            )
        )
        .subscribe(
            (mensaje) => {
                console.log(mensaje);
            },
            (error) => {
                console.log(error);
            }, () => {
                console.log('Completado');
                main();
            }
        )
}
function Menu(){
    return rxjs.of(inquirer.prompt(preguntaMenu))
}


//
const nombreBD= 'canciones.json';
function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDPromesa());

    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBDD: RespuestaBDD) => {
                    if (respuestaLeerBDD.bdd) {
                        return rxjs.of(respuestaLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBD())
                    }
                }
            )
        );
}

function leerBDPromesa(){
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

function crearBD() {
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

function guardarBase(bdd: BaseDeDatos) {
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
function buscarCancionNombre(nombre){
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreBD, 'utf-8',
                (err, contenido) => {
                    if (err) {

                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);
                        const respuestaFind = bdd.canciones
                            .find(
                                (cancion: Cancion) => {
                                    return cancion.nombre === nombre;
                                }
                            );

                        resolve(respuestaFind);
                    }
                });
        }
    );
}
//
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

interface RespuestaCancion {
    respuestaCancion: OpcionesPregunta,
    respuestaBDD: RespuestaBDD
    cancion?: Cancion
}
/*
const first = require('rxjs/operators').first
const source = rxjs.from([1, 2, 3, 4, 5]);
//no value will pass, emit default
const example = source.pipe(first(val => val === 5, 'Nothing'));
//output: 'Nothing'
const subscribe = example.subscribe(val => console.log(val));
*/
main()