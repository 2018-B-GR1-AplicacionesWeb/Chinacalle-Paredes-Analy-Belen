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
];
function main() {
    inicializarBase()
        .pipe(mergeMap((respuestaBDD) => {
        return Menu()
            .pipe(map((respuesta) => {
            return {
                respuestaCancion: respuesta,
                respuestaBDD
            };
        }));
    }), mergeMap(//preuntar y devolver observable
    (respuesta) => {
        switch (respuesta.respuestaCancion.opcionMenu) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaNuevaCancion))
                    .pipe(map((cancion) => {
                    respuesta.cancion = cancion;
                    return respuesta;
                }));
            case 'Buscar':
                return rxjs
                    .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                    .pipe(map((nombre) => {
                    respuesta.cancion.nombre = nombre;
                    return rxjs
                        .of(buscarCancionNombre(respuesta.cancion.nombre));
                }));
            case 'Actualizar':
                return rxjs
                    .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                    .pipe(
                        map(
                            nombre => {
                                respuesta.cancion.nombre = nombre;

                            }
                        )
                    );
            default:
                respuesta.cancion = {
                    nombre: null,
                    autor: null,
                    anio: null
                };
                rxjs.of(respuesta);
        }
    }), map(//dependiendo de la opcion seleccionada y los datos Actuar!! no devuelve observable
    (respuesta) => {
        console.log('respuesta en accion', respuesta);
        switch (respuesta.respuestaCancion.opcionMenu) {
            case 'Crear':
                const cancionNueva = respuesta.cancion;
                respuesta.respuestaBDD.bdd.canciones.push(cancionNueva);
                return respuesta;
            case 'Buscar':
                const respuestaF = respuesta.cancion;
                if (respuestaF) {
                    console.log(respuestaF);
                }
                else {
                    return 'No existe';
                }
        }
    }), // Guardar Base de Datos
    mergeMap((respuesta) => {
        return guardarBase(respuesta.respuestaBDD.bdd);
    }))
        .subscribe((mensaje) => {
        console.log(mensaje);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
        main();
    });
}
function Menu() {
    return rxjs.from(inquirer.prompt(preguntaMenu));
}
//
const nombreBD = 'canciones.json';
function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDPromesa());
    return leerBDD$
        .pipe(mergeMap((respuestaLeerBDD) => {
        if (respuestaLeerBDD.bdd) {
            return rxjs.of(respuestaLeerBDD);
        }
        else {
            // falsy / null
            return rxjs.from(crearBD());
        }
    }));
}
function leerBDPromesa() {
    // @ts-ignore
    return new Promise((resolve) => {
        fs.readFile(nombreBD, 'utf-8', (error, contenidoLeido) => {
            if (error) {
                resolve({
                    mensaje: 'Base de datos vacia',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'Si existe la Base',
                    bdd: JSON.parse(contenidoLeido)
                });
            }
        });
    });
}
function crearBD() {
    const base = '{"canciones": []}';
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.writeFile(nombreBD, base, (err) => {
            if (err) {
                reject({ Mensaje: 'error creando Base', error: 500 });
            }
            else {
                resolve({ Mensaje: 'Base creada', bdd: JSON.parse(base) });
            }
        });
    });
}
function guardarBase(bdd) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.writeFile(nombreBD, JSON.stringify(bdd, null, 2), (error) => {
            if (error) {
                reject({ Mensaje: 'error guardando', error: 500 });
            }
            else {
                resolve({ Mensaje: 'Base uardada' });
            }
        });
    });
}
function buscarCancionNombre(nombre) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile(nombreBD, 'utf-8', (err, contenido) => {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                const bdd = JSON.parse(contenido);
                const respuestaFind = bdd.canciones
                    .find((cancion) => {
                    return cancion.nombre === nombre;
                });
                resolve(respuestaFind);
            }
        });
    });
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
