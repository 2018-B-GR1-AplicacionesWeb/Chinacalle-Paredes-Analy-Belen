
const fs = require('fs');       //modulo usado para archivos  //No se espera nada

function appendFile(nombreArchivo, contenidoArchivo, callback) {
    //1ero leer si existe el archivo
    //Si existe sobreescribir el archivo con el contenido nuevo

    fs.readFile(nombreArchivo, 'utf-8',
        (error,contenidoArchivoLeido) => {       //funcion anonima(error,contenido)
            if(error){
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err)=> {
                        if (err) {
                            console.error('Error escribiendo')
                        } else {
                            console.log('Archivo creado');
                            callback(contenidoArchivo)
                        }
                    }
                    );
            } else {
                fs.writeFile(
                    nombreArchivo,
                    contenidoArchivoLeido + contenidoArchivo,
                    (err) => {
                        if(err){
                            console.error("Error escribiendo");
                            return Error
                        } else {
                            console.log("Archivo creado");
                            callback(undefined, contenidoArchivoLeido + contenidoArchivo);
                        }
                    }
                )
            }
        });
}

appendFile('06-texto.txt',
    'holaa\n',
    (contenidoArchivo, error) => {     //callback
        if(error){
            console.log(contenidoArchivo);
        } else {
            console.log(contenidoArchivo);
        }

    });

//['A', 'B', 'C']
// archivo y contenido
//NOMBRE, CONTENIDO, ERROR


function ejercicioDeArchivos(arregloStrings, callback) {  //callback asíncrono
    const arregloDeRespuestas = [];
    arregloStrings.forEach(             //Síncrono
        (string, indice)=>{
            const  archivo = `${indice}-${string}.txt`;
            const contenido = string;
            fs.writeFile(archivo,
                contenido,
                (err)=>{
                    const respuesta = {
                        nombreArchivo: archivo,
                        contenidoArchivo: contenido,
                        error: err

                    };
                    arregloDeRespuestas.push(respuesta);
                    const tamanioRespuestas = arregloDeRespuestas.length;
                    if(tamanioRespuestas === arregloStrings.length){
                        callback(arregloDeRespuestas);
                    }
                });
        }
    );
}

const arregloStrings = ['A','B','C'];
ejercicioDeArchivos(arregloStrings,
    (arregloRespuestas) =>{
        console.log(arregloRespuestas);
    });

//for ---> demasiado rápido --> demasiado síncrono
//let y fat arrow functions evitan errores

//unica manera de devolver información después que se ejecuta una función asíncrona
