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
function main() {
    inicializarBase()
        .pipe(mergeMap((respuestaBD) => {
        return Menu()
            .pipe(map((respuesta) => {
            return {
                respuestaUsuario: respuesta,
                respuestaBD
            };
        }));
    }), mergeMap((respuesta) => {
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
                    return respuesta;
                }));
            case 'Actualizar':
                return rxjs
                    .from(inquirer.prompt(preguntaCancionBusquedaPorNombre))
                    .pipe(find());
        }
    }));
}
function Menu() {
    return rxjs.of(inquirer.prompt(preguntaMenu));
}
//
function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDPromesa());
    return leerBDD$
        .pipe(mergeMap((respuestaLeerBDD) => {
        if (respuestaLeerBDD.bdd) {
            // truty / {}
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
        fs.writeFile(nombreBD, 'utf-8', (error, contenidoLeido) => {
            if (error) {
                resolve({ bdd: null });
            }
            else {
                resolve({ bdd: JSON.parse(contenidoLeido) });
            }
        });
    });
}
function crearBD() {
    const base = '{"canciones": []}';
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile(nombreBD, base, (err) => {
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
function buscarCancionNombre() {
}
const first = require('rxjs/operators').first;
const source = rxjs.from([1, 2, 3, 4, 5]);
//no value will pass, emit default
const example = source.pipe(first(val => val===  5, 'Nothing'));
//output: 'Nothing'
const subscribe = example.subscribe(val => console.log(val));
