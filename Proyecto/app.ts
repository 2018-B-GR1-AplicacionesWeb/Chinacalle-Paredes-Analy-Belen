

const fs = require('fs');
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const find = require('rxjs/operators').find;

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer??',
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
    {
        type: 'input',
        name: 'anio',
        message: 'Escribe el nuevo Año de la cancion: '
    },

];

function main(){
    inicializarBase()
        .pipe(
            mergeMap(
                (respuestaBDD: RespuestaBDD)=> {
                    return Menu()
                        .pipe(
                            map(
                                (respuesta: OpcionesPregunta) => {
                                    return {
                                        respuestaCancion: respuesta,
                                        respuestaBDD
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
                                            return rxjs
                                                .of(buscarCancionNombre(respuesta.cancion.nombre));
                                        }
                                    )
                                );
                        case 'Actualizar':
                            return rxjs
                                .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                                .pipe(
                                    map(
                                        nombre => {
                                            respuesta.cancion.nombre = nombre;
                                            return rxjs
                                                .from(actualizarCancion(nombre,inquirer.prompt(preguntaActualizarCancion)))
                                                .pipe(
                                                    map(
                                                        (mensaje)=> {
                                                            respuesta.respuestaBDD = mensaje;
                                                            return respuesta
                                                        }
                                                    )
                                                )

                                        }
                                    )
                                );
                        case 'Borrar':
                            return rxjs
                                .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                                .pipe(
                                    map(
                                        (nombre)=> {
                                            respuesta.respuestaBDD = eliminarCancion(nombre);
                                            return respuesta;
                                        }
                                    )
                                );
                        case 'Imprimir':
                            return rxjs
                                .of(leerBDPromesa())
                                .pipe(
                                  map(
                                      (respuesta)=> {
                                          respuesta.respuestaBDD = respuesta;
                                          return respuesta;
                                      }
                                  )
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
                            respuesta.respuestaBDD.bdd.canciones.push(cancionNueva);
                            return respuesta;
                        case 'Buscar':
                            let respuestaF = respuesta.cancion;
                            if (respuestaF){
                                console.log(respuestaF);
                            }else {
                                console.log('No existe')
                            }
                            break;

                        case 'Actualizar':
                            return respuesta;

                        case 'Borrar':
                            return respuesta;

                        case 'Imprimir':
                            console.log(respuesta.respuestaBDD.bdd);
                            break


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
    return rxjs.from(inquirer.prompt(preguntaMenu))
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
            fs.readFile(
                nombreBD,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        resolve({
                            mensaje: 'Base de datos vacia',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'Si existe la Base',
                            bdd: JSON.parse(contenidoLeido)
                        });
                    }

                }
            );
        }
    );
}

function crearBD() {
    const base = '{"canciones": []}';
    // @ts-ignore
    return new Promise(
        (resolve,reject) => {
            fs.writeFile(
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

function actualizarCancion(nombre, cancion){
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreBD,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error){
                        reject('Error leyendo')
                    }  else {
                        const bdd = JSON.parse(contenidoLeido);
                        const indiceCancion = bdd.canciones
                            .findIndex(
                                (cancion) => {
                                    return cancion.nombre = nombre;
                                }
                            );

                        bdd.canciones[indiceCancion] = cancion;

                        fs.writeFile(
                            nombreBD,
                            JSON.stringify(bdd, null,2),
                            (err) =>{
                                if (err){
                                    reject(err)
                                } else{
                                    resolve({
                                        mensaje: 'Cancion actualizada',
                                        bdd: JSON.parse(bdd)})
                                }
                            }

                        )
                    }
                });
        }
    );
}

function eliminarCancion(nombre){
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreBD,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error){
                        reject('Error leyendo')
                    }  else {
                        const bdd = JSON.parse(contenidoLeido);
                        const indiceCancion = bdd.canciones
                            .findIndex(
                                (cancion) => {
                                    return cancion.nombre = nombre;
                                }
                            );

                        bdd.canciones
                            .splice(indiceCancion, 1);

                        fs.writeFile(
                            nombreBD,
                            JSON.stringify(bdd, null,2),
                            (err) =>{
                                if (err){
                                    reject(err)
                                } else{
                                    resolve({
                                        mensaje: 'Cancion eliminada',
                                        bdd: JSON.parse(bdd)
                                    })
                                }
                            }

                        )
                    }
                });
        }
    );
}

//
interface Cancion {
    nombre: string;
    autor: string;
    anio: string;
}

interface BaseDeDatos {
    canciones: Cancion[];
}
interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}
interface OpcionesPregunta {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar' |'Imprimir'
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
main();