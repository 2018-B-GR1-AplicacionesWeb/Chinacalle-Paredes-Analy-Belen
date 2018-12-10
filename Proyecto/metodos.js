const fs = require('fs');
const inquirer = require('inquirer');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const find = require('rxjs/operators').find;
const filter = require('rxjs/operators').filter;
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
const preguntaCancionActualizarPorNombre = [
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
                    respuesta.cancion = nombre;
                    return respuesta;
                }));
            case 'Actualizar':
                return rxjs
                    .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                    .pipe(mergeMap((nombre) => {
                    respuesta.cancion = nombre;
                    const indiceCancionBuscar = buscarCancion(respuesta.cancion.nombre, respuesta.respuestaBDD.bdd);
                    console.log('indice ' + indiceCancionBuscar);
                    respuesta.indice = indiceCancionBuscar;
                    if (indiceCancionBuscar > -1) { //mayor -1
                        console.log('Canción encontrada');
                        console.log(JSON.stringify(respuesta.respuestaBDD.bdd.canciones[indiceCancionBuscar], null, 2));
                        return rxjs
                            .from(inquirer.prompt(preguntaActualizarCancion))
                            .pipe(map((cancion) => {
                            console.log('valor: ' + JSON.stringify(cancion));
                            //Actualizas el ob respuesta
                            respuesta.cancion = cancion;
                            return respuesta;
                        }));
                    }
                    else {
                        console.log(' Canción no existe');
                    }
                    respuesta.indice = indiceCancionBuscar;
                    return respuesta;
                }));
            case 'Borrar':
                return rxjs
                    .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                    .pipe(map((nombre) => {
                    respuesta.cancion = nombre;
                    console.log('borrar cancion: ' + respuesta.cancion.nombre);
                    return respuesta;
                }));
            case 'Imprimir':
                return rxjs.of(respuesta);
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
            case 'Actualizar':
                console.log('nueva cancion: ' + JSON.stringify(respuesta.cancion));
                console.log('antigua cancion: ' + JSON.stringify(respuesta.respuestaBDD.bdd.canciones[respuesta.indice]));
                respuesta.respuestaBDD.bdd.canciones[respuesta.indice].nombre = respuesta.cancion.nombre;
                respuesta.respuestaBDD.bdd.canciones[respuesta.indice].autor = respuesta.cancion.autor;
                respuesta.respuestaBDD.bdd.canciones[respuesta.indice].anio = respuesta.cancion.anio;
                return respuesta;
            case 'Borrar':
                const contenido = JSON.stringify(respuesta.respuestaBDD.bdd);
                const bdd = JSON.parse(contenido);
                const indiceCancion = buscarCancion(respuesta.cancion.nombre, respuesta.respuestaBDD.bdd);
                //console.log('indice' +indiceCancion);
                bdd.canciones
                    .splice(indiceCancion, 1);
                respuesta.respuestaBDD.mensaje = 'Cancion eliminada';
                respuesta.respuestaBDD.bdd = bdd;
                return respuesta;
            case 'Buscar':
                const indiceaBuscar = buscarCancion(respuesta.cancion.nombre, respuesta.respuestaBDD.bdd);
                //console.log('indice ' +indiceaBuscar);
                if (indiceaBuscar > -1) { //mayor -1
                    console.log('Canción encontrada: ' + JSON.stringify(respuesta.respuestaBDD.bdd.canciones[indiceaBuscar], null, 2));
                }
                else {
                    console.log(' Canción no existe');
                }
                respuesta.respuestaBDD.mensaje = 'Busqueda';
                return respuesta;
            case 'Imprimir':
                console.log(respuesta.respuestaBDD.bdd);
                return respuesta;
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
function Actualizar() {
    return rxjs.from(inquirer.prompt(preguntaActualizarCancion));
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
                resolve({ Mensaje: 'Base guardada' });
            }
        });
    });
}
function buscarCancion(nombre, bdd) {
    const contenidoActual = JSON.stringify(bdd);
    const baseActual = JSON.parse(contenidoActual);
    const indiceCancion = baseActual.canciones
        .findIndex((cancion) => {
        return cancion.nombre === nombre;
    });
    return indiceCancion;
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
