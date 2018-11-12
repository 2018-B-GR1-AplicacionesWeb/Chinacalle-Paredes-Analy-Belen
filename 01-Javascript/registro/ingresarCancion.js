const cancion = {
    "nombre": "",
    "autor": "",
    "anio": ""
};


const fs = require('fs');
const nombreArchivo = 'datos.json';

function guardarEnArchivo(cancionNueva) {
    fs.readFile(nombreArchivo,
        'utf-8',
        (error, contenidoArchivo) =>{
        if (error) {
            console.error(error);
            try{
                throw new Error (error);
            }catch (e) {
                console.log(e);
            }
            console.log('Extra')
        }else {
            //var jsonStr = JSON.stringify(contenidoArchivo);
            const obj = JSON.parse(contenidoArchivo);

            obj['ListaCanciones'].push(cancionNueva);
            const jsonStr = JSON.stringify(obj,null, 2);
            fs.writeFile(nombreArchivo, jsonStr, (err) => {
                if (err) throw err;
                console.log('Archivo completado!');
            });
        }
        });
}


function imprimirCancionesDeArchivo() {
    fs.readFile(nombreArchivo,
        'utf-8',
        (error, contenidoArchivo) =>{
            if (error) {
                console.error(error);
                try{
                    throw new Error (error);
                }catch (e) {
                    console.log(e);
                }
                console.log('Extra')
            }else {
                let canciones = "";
                const obj = JSON.parse(contenidoArchivo);
                for (i = 0; i <obj['ListaCanciones'].length; i++){
                    canciones += obj['ListaCanciones'][i].nombre + "\n";
                   // console.log(obj['ListaCanciones'][i].nombre);
                }
                console.log(canciones);
                //console.log(obj['ListaCanciones'].length);
                //console.log(obj['ListaCanciones'][0].nombre);

            }
        });
}


function buscarCancionesDeArchivo(razon, llave) {
    fs.readFile(nombreArchivo,
        'utf-8',
        (error, contenidoArchivo) =>{
            if (error) {
                console.error(error);
                try{
                    throw new Error (error);
                }catch (e) {
                    console.log(e);
                }
                console.log('Extra')
            }else {
                const obj = JSON.parse(contenidoArchivo);
                if (razon.localeCompare("Nombre")){
                    for (i = 0; i <obj['ListaCanciones'].length; i++){
                        const str = JSON.stringify(obj['ListaCanciones'][i].nombre);
                        if(str.localeCompare(llave)){
                            console.log(JSON.stringify(obj['ListaCanciones'][i]));
                            break;
                        }
                    }
                } else if (razon.localeCompare("Autor")){
                    for (i = 0; i <obj['ListaCanciones'].length; i++){
                        const str = JSON.stringify(obj['ListaCanciones'][i].autor);
                        if(str.localeCompare(llave)){
                            //console.log(obj['ListaCanciones'][i]);
                            console.log(JSON.stringify(obj['ListaCanciones'][i]));
                            break;
                        }
                    }
                }
                console.log("No existe")
            }
        });
}

module.exports = {
  guardarCancion: (nombreCancion, autorCancion, anio) => {
      cancion.nombre = nombreCancion;
      cancion.autor = autorCancion;
      cancion.anio = anio;
      guardarEnArchivo(cancion);
      return cancion;
  },
    imprimirListaCanciones: () => {
      imprimirCancionesDeArchivo();
  },
    buscarCancionPorNombre: (nombreCancion) => {
      buscarCancionesDeArchivo("Nombre", nombreCancion);
    },
    buscarCancionesPorAutor: (autorCancion) => {
      buscarCancionesDeArchivo("Autor", autorCancion);
    },
    eliminarCancionPorNombre: (nombreCancion) => {
    }

};










//AYUDA y PREG
//https://stackoverflow.com/questions/18884840/adding-a-new-array-element-to-a-json-object

//https://stackabuse.com/reading-and-writing-json-files-with-node-js/