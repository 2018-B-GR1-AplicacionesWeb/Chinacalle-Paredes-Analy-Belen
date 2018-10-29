//promesa --> definir una nueva clase
const fs = require('fs');

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
            console.log('Contenido completo', contenidoCompleto)
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