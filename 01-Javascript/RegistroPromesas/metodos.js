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
                        resolve('{"ListaCanciones":[]}');   //{"ListaCanciones": []}
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
                //if(obj['ListaCanciones'])
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
                    //const str = JSON.stringify(obj['ListaCanciones'][i].nombre);
                    const str = (obj['ListaCanciones'][i].nombre);
                    console.log("obj: ",str, " tipo: ",typeof str);
                    console.log("llave: ",llave, "tipo: ", typeof llave);
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
                console.log('Encontrado: ', respuesta);
                resolve(respuesta);
            } else {
                console.log('No existe: ', respuesta);
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
                    console.log(contenidoArchivo);
                    return imprimirConPromesa(contenidoArchivo);
                }
            )
            .catch(
                (resultadoError) => {
                    console.log('Algo malo paso imprimiendo', resultadoError);
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
                    console.log('Algo malo paso Buscando por Nombre', resultadoError);
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
                    console.log('Algo malo paso Buscando por autor', resultadoError);
                }
            );
    },
    eliminarCancion: (nombreCancion, nuevoNombre) => {
        leerArchivoPromesa
            .then(
                (contenidoArchivo) => {
                    buscarCancionConPromesa(contenidoArchivo,"Nombre", nombreCancion)
                        .then(
                            (cancionBuscada) => {
                                cancionBuscada.nombre = nuevoNombre;
                                return escribirArchivoPromesa(contenidoArchivo,cancionBuscada)
                            }
                        )

                }
            )
    }
};


