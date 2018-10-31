//promesa --> definir una nueva clase
const fs = require('fs');
/*
const nuevaPromesaLectura = new Promise(
    (resolve) => {
        fs.readFile('06-texto.txt', 'utf-8',
            (err, contenidoArchivo) => {
            if(err){
                resolve('');
            } else {
                resolve(contenidoArchivo);
            }
            });
    }
);

const nuevaPromesaEscritura = (contenidoLeido) =>{
  return new Promise(      //sin el return se ejecutó sin .THEN!!!!!!
      (resolve, reject) => {

          const contenido = contenidoLeido? contenidoLeido+ 'asdfghj': 'asddfghjkl';
          fs.writeFile('06-texto.txt', contenido,
              (err, contenido) => {
                  if(err){
                      reject(err);
                  } else {
                      resolve(contenido);
                  }
              });
      }
  );
};


nuevaPromesaLectura
    .then(
        (contenidoArchivo)=>{
            console.log('Todo bien ', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido completo', contenidoCompleto);
            return nuevaPromesaEscritura(contenidoCompleto);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );

///////////////////
const appendFilePromesaLectura = new Promise(
    //NOMBRE DEL ARCHIVO Y CONTENIDO
    //SI NO EXISTE CREAR, SI EXISTE AUMENTAR AL FINAL
    (resolve) => {
        fs.readFile('06-texto.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if(err){
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const appendFilePromesaEscritura = (contenidoLeido, contenidoNuevo) => {
    return new Promise(
        //NOMBRE DEL ARCHIVO Y CONTENIDO
        //SI NO EXISTE CREAR, SI EXISTE AUMENTAR AL FINAL
        (resolve) => {
            const contenido = contenidoLeido? contenidoLeido+ contenidoNuevo: contenidoNuevo;
            fs.writeFile('06-texto.txt', contenido,
                (err, contenidoArchivo) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(contenidoArchivo);
                    }
                });
        }
    );
};

appendFilePromesaLectura
    .then(
        (contenidoArchivo)=>{
            console.log('Contenido ', contenidoArchivo);
            const contenidoNuevo = 'asdfghjkl';
            return appendFilePromesaEscritura(contenidoArchivo, contenidoNuevo)
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido ', contenidoCompleto)
        }
    )
    .catch(
        (resultadoError) => {
            console.log('No se escribió el archivo ', resultadoError);
        }
    );
*/

/////////////////forEach
/*
[A,B,C]
0-A.txt
1-B.txt
2-C.txt
 */

const promesaCreacionArchivo = (indice, string) => {
    return new Promise(
        (resolve, reject) => {
            const archivo = `${indice}-${string}.txt`;
            const contenido = string;
            fs.writeFile(archivo,contenido,
                (err,) => {
                    if(err) {
                        reject(err);
                    } else {
                        const respuesta = {
                          nombreArchivo: archivo,
                          contenidoArchivo: contenido,
                          error: err
                        };

                        resolve(respuesta);
                    }
                })
        }
    )
};
const arregloStrings = ['A', 'B', 'C'];
const arregloFinal = [];

arregloStrings.forEach(
    (string, index) => {
        promesaCreacionArchivo(index, string)
            .then(
                (respuesta) => {
                    arregloFinal.push(respuesta);
                }
            )
            .catch(
                (error) => {
                    console.log('Error', error);
                }
            );
    }
);

/*
const promesaRecorreArregloStrings = new Promise(
  resolve => {
      arregloStrings.forEach(
          (string, indice) =>{
              resolve(string,indice);
          })
  }
);

promesaRecorreArregloStrings
    .then(
        (string, indice) => {

            return promesaCreacionArchivo(string,indice);
        }
    )
    .catch(
        (error) => {
            console.log("Problema");
        }
    );
*/





/*
promesaCreacionArchivo(0,'A')
    .then(
        (respuesta) => {
            arregloFinal.push(respuesta);
        }
    )
    .catch(
        (error) => {
            console.log('Error', error);
        }
    );

promesaCreacionArchivo(1,'B')
    .then(
        (respuesta) => {
            arregloFinal.push(respuesta);
        }
    )
    .catch(
        (error) => {
            console.log('Error', error);
        }
    );

promesaCreacionArchivo(2,'C')
    .then(
        (respuesta) => {
            arregloFinal.push(respuesta);
        }
    )
    .catch(
        (error) => {
            console.log('Error', error);
        }
    );
*/

//
/*
const ejercicioDeArchivos(arregloStrings) {  //callback asíncrono
    return new Promise(
        (resolve, reject) => {
            arregloStrings.forEach(             //Síncrono
                (string, indice)=>{
                    const  archivo = `${indice}-${string}.txt`;
                    const contenido = string;
                    const arregloDeRespuestas = [];
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
                                return arregloDeRespuestas;
                            }
                        });
                }
            );
        }
    );

}
*/

