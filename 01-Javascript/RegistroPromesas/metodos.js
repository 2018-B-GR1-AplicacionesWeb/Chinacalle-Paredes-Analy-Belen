const cancion = {
    "nombre": "",
    "autor": "",
    "anio": ""
};

const fs = require('fs');
const nombreArchivo = 'datos.json';

const leerArchivoPromesa = new Promise(
        (resolve)=> {
            fs.readFile(nombreArchivo, 'utf-8',
                (err, contenidoArchivo) => {
                    if (err) {
                        resolve('');
                    } else {
                        resolve(contenidoArchivo);
                    }
                });
        }
);

const escribirArchivoPromesa = function (contenidoLeido, cancionNueva) {
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
    return new Promise(
        (resolve, reject) => {
            const obj = JSON.parse(contenidoArchivo);
            let respuesta;
            if (razon === "Nombre"){
                for (let i = 0; i <obj['ListaCanciones'].length; i++){
                    const str = JSON.stringify(obj['ListaCanciones'][i].nombre);
                    if(str === llave){
                        respuesta = JSON.stringify(obj['ListaCanciones'][i]);
                        break;
                    }
                }
            } else if (razon === "Autor"){
                for (let i = 0; i <obj['ListaCanciones'].length; i++){
                    const str = JSON.stringify(obj['ListaCanciones'][i].autor);
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



module.exports = {
    guardarCancion: (nombreCancion, autorCancion, anio) => {
        cancion.nombre = nombreCancion;
        cancion.autor = autorCancion;
        cancion.anio = anio;

        leerArchivoPromesa
            .then(
                (contenidoArcivo) => {
                    return escribirArchivoPromesa(contenidoArcivo,cancion);
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
                (contenidoArcivo) => {
                    console.log(contenidoArcivo);
                    return imprimirConPromesa(contenidoArcivo);
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
                (contenidoArcivo) => {
                    return buscarCancionConPromesa(contenidoArcivo,"Nombre", nombreCancion);
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
                (contenidoArcivo) => {
                    return buscarCancionConPromesa(contenidoArcivo,"Autor", nombreAutor);
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso', resultadoError);
                }
            );
    }
};