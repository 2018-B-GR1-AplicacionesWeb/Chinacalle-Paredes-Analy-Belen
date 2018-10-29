const fs = require('fs'); //importar

const contenidoAgregar = 'AnalyΩΩå∫∂∂∂∂';
const nombreArchivo = '05-texto.txt';
console.log('inicio');

fs.readFile(nombreArchivo,
    'utf-8',
    (error,contenidoArchivo) =>{        //callback
    if(error) {
        console.error(error);
        try {
            throw new Error (error);
        } catch (e) {
            console.log(e);
        }
        console.log('Extra');
    } else {
        //console.log('SIIIIIII', contenidoArchivo);

        fs.writeFile(nombreArchivo,contenidoArchivo+ contenidoAgregar, (err) =>{
            if(err) throw err;
            console.log('Archivo completado!');
        });
    }
});

console.log('Final');