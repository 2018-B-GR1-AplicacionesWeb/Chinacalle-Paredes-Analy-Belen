//declare var require: any;
var inquirer = require('inquirer');
var fs = require('fs');
var rxjs = require('rxjs');
var mergeMap = require('rxjs/operators').mergeMap;
var map = require('rxjs/operators').map;
var preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};
var preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es tu id'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es tu nombre'
    },
];
var preguntaUsuarioBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del usuario a buscar'
    }
];
var preguntaUsuarioNuevoNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe tu nuevo nombre'
    }
];
function main() {
    console.log('Empezo');
    inicializarBase()
        .pipe(mergeMap(// preguntar opcion
    function (respuestaBDD) {
        return preguntarMenu()
            .pipe(map(function (respuesta) {
            return {
                respuestaUsuario: respuesta,
                respuestaBDD: respuestaBDD
            };
        }));
    }), // dependiendo de la opcion PREGUNTAMOS DEPENDIENDO LAS OPCIONES
    mergeMap(function (respuesta) {
        console.log(respuesta);
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map(function (usuario) {
                    respuesta.usuario = usuario;
                    return respuesta;
                }));
            default:
                respuesta.usuario = {
                    id: null,
                    nombre: null
                };
                rxjs.of(respuesta);
        }
    }), // Ejecutar Accion
    map(function (respuesta) {
        console.log('respuesta en accion', respuesta);
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Crear':
                var usuario = respuesta.usuario;
                respuesta.respuestaBDD.bdd.usuarios.push(usuario);
                return respuesta;
        }
    }), // Guardar Base de Datos
    mergeMap(function (respuesta) {
        return guardarBase(respuesta.respuestaBDD.bdd);
    }))
        .subscribe(function (mensaje) {
        console.log(mensaje);
    }, function (error) {
        console.log(error);
    }, function () {
        console.log('Completado');
        main();
    });
}
function inicializarBase() {
    var leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(mergeMap(function (respuestaLeerBDD) {
        if (respuestaLeerBDD.bdd) {
            // truty / {}
            return rxjs.of(respuestaLeerBDD);
        }
        else {
            // falsy / null
            return rxjs.from(crearBDD());
        }
    }));
}
function preguntarMenu() {
    return rxjs.from(inquirer.prompt(preguntaMenu));
}
function leerBDD() {
    // @ts-ignore
    return new Promise(function (resolve) {
        fs.readFile('bdd.json', 'utf-8', function (error, contenidoLeido) {
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
function crearBDD() {
    var contenidoInicialBDD = '{"usuarios":[],"mascotas":[]}';
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', contenidoInicialBDD, function (err) {
            if (err) {
                reject({
                    mensaje: 'Error creando Base',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD creada',
                    bdd: JSON.parse('{"usuarios":[],"mascotas":[]}')
                });
            }
        });
    });
}
function guardarBase(bdd) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
            if (err) {
                reject({
                    mensaje: 'Error guardando BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada'
                });
            }
        });
    });
}
function anadirUsuario(usuario) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                bdd.usuarios.push(usuario);
                fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ mensaje: 'Usuario Creado' });
                    }
                });
            }
        });
    });
}
function editarUsuario(nombre, nuevoNombre) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                var indiceUsuario = bdd.usuarios
                    .findIndex(function (usuario) {
                    return usuario.nombre = nombre;
                });
                bdd.usuarios[indiceUsuario].nombre = nuevoNombre;
                fs.writeFile('bdd.json', JSON.stringify(bdd), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ mensaje: 'Usuario Editado' });
                    }
                });
            }
        });
    });
}
function buscarUsuarioPorNombre(nombre) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile('bdd.json', 'utf-8', function (err, contenido) {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                var bdd = JSON.parse(contenido);
                var respuestaFind = bdd.usuarios
                    .find(function (usuario) {
                    return usuario.nombre === nombre;
                });
                resolve(respuestaFind);
            }
        });
    });
}
main();
