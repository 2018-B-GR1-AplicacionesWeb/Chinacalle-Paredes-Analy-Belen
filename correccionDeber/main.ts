declare var Promise;

const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

const preguntaMenu = {
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

const preguntaUsuario = [
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

const preguntaUsuarioBusquedaPorNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe el nombre del usuario a buscar'
    }
];


const preguntaUsuarioNuevoNombre = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Escribe tu nuevo nombre'
    }
];

//async function main() {
function main() {
    console.log('Empezo');
    try {
        //await inicializarBase();
        inicializarBase()
            .pipe(
                mergeMap(
                    (respuestaBDD: RespuestaBDD)=>{
                        return preguntaMenu()
                            .pipe(
                                map(
                                    (respuesta: OpcionesPregunta)=> {
                                        return {
                                            respuestaUsuario: respuesta,
                                            respuestaBDD
                                        }
                                    }
                                )
                            ),
                            mergeMap(
                                (respuesta: RespuestaUsuario) => {
                                    switch (respuesta.respuestaUsuario.opcionMenu) {
                                        case 'Crear':
                                            return rxjs
                                                .from(inquirer.prompt(preguntaUsuario))
                                                .pipe(
                                                    map(
                                                        (usuario)=>{
                                                            respuesta.usuario = usuario;
                                                            return respuesta
                                                        }
                                                    )
                                                )
                                        default:
                                            respuesta.usuario={
                                                id:null,
                                                nombre:null
                                            };
                                            rxjs.of(respuesta)
                                    }
                                }
                            )
                    }
                ),
                map(
                    (respuesta: RespuestaUsuario)=>{
                        switch (respuesta.respuestaUsuario.opcionMenu) {
                            case 'Crear':
                                const usuario = respuesta.usuario;
                                respuesta.respuestaBDD.bdd.usuarios.push(usuario)
                        }
                    }
                ),
                mergeMap(
                    (respuesta: RespuestaUsuario) => {
                        return guardarBase(respuesta.respuestaBDD.bdd);
                    }
                )
            )
            .subscribe(
                (mensaje)=>{
                    console.log(mensaje);
                },
                (error)=>{
                    console.log(error)
                },
                ()=>{
                    console.log('Complrtado');
                    main()
                }
            )
        /*
        const respuesta = await inquirer.prompt(preguntaMenu);
        switch (respuesta.opcionMenu) {
            case 'Crear':

                const respuestaUsuario = await inquirer.prompt(preguntaUsuario);
                await anadirUsuario(respuestaUsuario);
                main();
                break;

            case 'Actualizar':

                const respuestaUsuarioBusquedaPorNombre = await inquirer.prompt(preguntaUsuarioBusquedaPorNombre);

                const existeUsuario = await buscarUsuarioPorNombre(respuestaUsuarioBusquedaPorNombre.nombre);

                if (existeUsuario) {
                    const respuestaNuevoNombre = await inquirer.prompt(preguntaUsuarioNuevoNombre);
                    await editarUsuario(respuestaUsuarioBusquedaPorNombre.nombre, respuestaNuevoNombre.nombre);
                } else {
                    console.log('El usuario no existe');

                    main();
                    break;
                }


        }
        */
    } catch (e) {
        console.log('Hubo un error');
    }
}

function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBD: RespuestaBDD)=> {
                    if(respuestaLeerBD.bdd){
                        //truty
                        return rxjs.of(respuestaLeerBD)
                    }else{
                        //falsy
                        return rxjs.from(crearBDD())
                    }
                }
            )
        );
    /*
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        fs.writeFile('bdd.json',
                            '{"usuarios":[],"mascotas":[]}',
                            (err) => {
                                if (err) {
                                    reject({mensaje: 'Error'});
                                }
                                resolve({mensaje: 'ok'});
                            });



                    } else {
                        resolve({mensaje: 'ok'});
                    }
                });
        }
    );
    */
}
function preguntarMenu(){
    return rxjs.from()
}
function leerBDD():Promise<BaseDeDatos>{ //Devuelve promesa de tipo Base de Datos
    return new Promise(
        (resolve) => {
            fs.readFile(
                'bdd.json', 'utf-8',
                (error, contenidoLeido) => {
                    if(error){
                        resolve({mensaje: 'BAse de datos vacía', bdd: null});
                    } else{
                        resolve({mensaje: 'Si existe la base', bdd: JSON.parse(contenidoLeido)});
                    }
                }
            )
        }
    )
}
function crearBDD() {
    const contenidoInicialBDD = '{"usuarios":[]}';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                contenidoInicialBDD,
                (err) => {
                    if(err) {
                        reject({
                            mensaje: 'Error creando base',
                            error: 500
                        })
                    }else {
                        resolve({
                            mensaje: 'BDD creada'
                        });
                    }
                }
            )
        }
    )
}

function guardarBase(bdd: BaseDeDatos) {
    return new Promise(
        (resolve, reject)=> {

        }
    )
}

function anadirUsuario(usuario) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);


                        bdd.usuarios.push(usuario);


                        fs.writeFile(
                            'bdd.json',
                            JSON.stringify(bdd),
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({mensaje: 'Usuario Creado'});
                                }
                            }
                        );
                    }
                });
        }
    );
}

function editarUsuario(nombre, nuevoNombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);


                        const indiceUsuario = bdd.usuarios
                            .findIndex(
                                (usuario) => {
                                    return usuario.nombre = nombre;
                                }
                            );

                        bdd.usuarios[indiceUsuario].nombre = nuevoNombre;


                        fs.writeFile(
                            'bdd.json',
                            JSON.stringify(bdd),
                            (err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve({mensaje: 'Usuario Editado'});
                                }
                            }
                        );
                    }
                });
        }
    );
}

function buscarUsuarioPorNombre(nombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);

                        const respuestaFind = bdd.usuarios
                            .find(
                                (usuario) => {
                                    return usuario.nombre === nombre;
                                }
                            );

                        resolve(respuestaFind);
                    }
                });
        }
    );
}

main();

interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface BaseDeDatos {
    usuarios: any[];
    mascotas: any[];
}
interface Usuario {
    id: number;
    nombre: string;
}
interface Mascota {
    id: number;
    nombre: string;
    idUsuario: number;
}
interface OpcionesPregunta{
    opcionMenu:'Crear'| 'Borrar'|'Buscar'| 'Actualizar'
}

interface RespuestaUsuario {
    respuestaUsuario: OpcionesPregunta,
    respuestaBDD: RespuestaBDD,
    usuario?: Usuario
}