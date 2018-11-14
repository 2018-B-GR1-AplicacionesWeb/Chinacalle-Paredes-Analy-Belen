
const cancion = {
    "nombre": "",
    "autor": "",
    "anio": ""
};

// @ts-ignore
var require: any;

const fs = require('fs');
const nombreArchivo = 'datos.json';
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;


// @ts-ignore
const leerArchivoPromesa = new Promise(
    (resolve)=> {
        fs.readFile(nombreArchivo, 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    resolve('{"ListaCanciones":[]}');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const escribirArchivoPromesa = function (contenidoLeido, cancionNueva) {
    // @ts-ignore
    return new Promise(
        ((resolve, reject) => {
            let contenido = '';
            if(contenidoLeido){
                const obj = JSON.parse(contenidoLeido);

                obj['ListaCanciones'].push(cancionNueva);
                contenido = JSON.stringify(obj,null, 2);
            }
            else{
                contenido =
                    '{"ListaCanciones": ['+cancionNueva+']}';

            }
            fs.writeFile(nombreArchivo, contenido,
                (err,) => {
                    if (err){
                        reject(err);
                    } else{
                        resolve('Cancion Insertada')
                    }
                });
        })
    );
};

const imprimirConPromesa = function (contenidoArchivo) {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            let canciones = "";
            const obj = JSON.parse(contenidoArchivo);
            for (let i = 0; i <obj['ListaCanciones'].length; i++){
                canciones += obj['ListaCanciones'][i].nombre + "\n";
                // console.log(obj['ListaCanciones'][i].nombre);
            }
            if(canciones){
                resolve(canciones);
            } else {
                reject();
            }
        }
    );
};
const buscarCancionConPromesa = function(contenidoArchivo, razon, llave){
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            const obj = JSON.parse(contenidoArchivo);
            let respuesta;
            if (razon === "Nombre"){
                for (let i = 0; i <obj['ListaCanciones'].length; i++){
                    const str = (obj['ListaCanciones'][i].nombre);
                    if(str === llave){
                        respuesta = JSON.stringify(obj['ListaCanciones'][i]);
                        break;
                    }
                }
            } else if (razon === "Autor"){
                for (let i = 0; i <obj['ListaCanciones'].length; i++){
                    const str = (obj['ListaCanciones'][i].autor);
                    if(str === llave){
                        respuesta = JSON.stringify(obj['ListaCanciones'][i]);
                        break;
                    }
                }
            }
            if(respuesta) {
                resolve(respuesta);
            } else {
                console.log('No existe');
                reject();
            }
        }
    );
};


var module: any;

module.exports = {
    guardarCancion: (nombreCancion, autorCancion, anio) => {
        cancion.nombre = nombreCancion;
        cancion.autor = autorCancion;
        cancion.anio = anio;

        leerArchivoPromesa
            .then(
                (contenidoArchivo) => {
                    return escribirArchivoPromesa(contenidoArchivo,cancion);
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso', resultadoError);
                }
            );
    },
    imprimirListaCanciones: () => {
        leerArchivoPromesa
            .then(
                (contenidoArchivo) => {
                    const obj = (contenidoArchivo);
                    //const obj2 = (obj['ListaCanciones']);
                    const datos = rxjs.of(obj);
                    const observable$ = (datos);
                    observable$
                        .pipe(
                            disctinct(),
                            map(
                                (valor) => {
                                    console.log('Valor', valor);
                                    return {
                                        data:JSON.parse(valor)
                                    };
                                }
                            )
                        )
                        .subscribe(
                            (ok) => {
                                console.log('Fin');
                            },
                            (error) => {
                                console.log(error);
                            },
                            () => {
                                console.log('Completado');
                            }
                        );
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso', resultadoError);
                }
            );
    },
    buscarCancionPorNombre: (nombreCancion) => {
        leerArchivoPromesa
            .then(
                (contenidoArchivo) => {
                    return buscarCancionConPromesa(contenidoArchivo,"Nombre", nombreCancion);
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso', resultadoError);
                }
            );
    },
    buscarCancionPorAutor: (nombreAutor) => {
        leerArchivoPromesa
            .then(
                (contenidoArchivo) => {
                    return buscarCancionConPromesa(contenidoArchivo,"Autor", nombreAutor);
                    //v
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso', resultadoError);
                }
            );
    },
    eliminarCancion: (nombreCancion) => {
        leerArchivoPromesa
            .then(
                (contenidoArchivo) => {
                    const cancion = buscarCancionConPromesa(contenidoArchivo,"Nombre", nombreCancion);
                    console.log(typeof cancion);
                    console.log(cancion);
                }
            )
    }
};


/////APLICACION ////

const app = require('./metodosPromesasObservables');
//app.imprimirListaCanciones();
interface Cancion {
    nombre: string,
    autor: string,
    anio: string
}

const menu = "Menu de Canciones" +
    "\n1. Ingresar cancion" +
    "\n2. Buscar cancion por Nombre" +
    "\n3. Buscar cancion por Autor" +
    "\n4. Eliminar cancion" +
    "\n5. Actualizar cancion" +
    "\n6. Imprimir lista de canciones" +
    "\n7. Salir";
console.log(menu);

var opc: number = 7;

console.log('Opcion seleccionada: ',opc);
while(opc!=7){
    switch (opc) {
        case 1:
            const objCancion: Cancion = {
                nombre: prompt('Nombre de la cancion:', ''),
                autor: prompt('Autor de la cancion:', ''),
                anio: prompt('Año de la cancion:', '')
            };
            app.guardarCancion(objCancion.nombre, objCancion.autor, objCancion.anio);
            break;
        case 2:
            const nombre = prompt("Ingrese el nombre de la cancion: ");
            app.buscarCancionPorNombre(nombre);
            break;
        case 3:
            const autor = prompt("Ingrese el autor de la cancion: ");
            app.buscarCancionPorAutor(autor);
            break;
        case 4:
            const nombreCancion = prompt("Ingrese el nombre de la cancion: ");
            app.eliminarCancion(nombreCancion);
            break;
        case 5:
            //actualizar
            break;
        case 6:
            app.imprimirListaCanciones();
            break;
    }
    console.log(menu);

    console.log('Opcion seleccionada: ',opc);

}

