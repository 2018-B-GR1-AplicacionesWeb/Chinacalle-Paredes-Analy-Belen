declare var require: any;

const rxjs = require('rxjs');
const inquirer = require('inquire');
const map = require('rxjs/operators').map;
import {guardarCancion, imprimirListaCanciones,eliminarCancion, buscarCancionPorAutor, buscarCancionPorNombre} from './metodosPromesasObservables';
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
inquirer
    .prompt(menu)
        .then(opc => {
            while(opc!=7){
                switch (opc) {
                    case 1:
                        const objCancion: Cancion = {
                            nombre: prompt('Nombre de la cancion:', ''),
                            autor: prompt('Autor de la cancion:', ''),
                            anio: prompt('Año de la cancion:', '')
                        };
                        guardarCancion(objCancion.nombre, objCancion.autor, objCancion.anio);
                        break;
                    case 2:
                        const nombre = prompt("Ingrese el nombre de la cancion: ");
                        buscarCancionPorNombre(nombre);
                        break;
                    case 3:
                        const autor = prompt("Ingrese el autor de la cancion: ");
                        buscarCancionPorAutor(autor);
                        break;
                    case 4:
                        const nombreCancion = prompt("Ingrese el nombre de la cancion: ");
                        eliminarCancion(nombreCancion);
                        break;
                    case 5:
                        //actualizar
                        break;
                    case 6:
                        imprimirListaCanciones();
                        break;
                }
                console.log(menu);

                console.log('Opcion seleccionada: ',opc);

            }
        });






