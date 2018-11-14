declare var require: any;
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const app= require('./metodosPromesasObservables');
interface Cancion {
    nombre: string,
    autor: string,
    anio: string
}
const cancion: Cancion = {
    nombre: prompt('Nombre de la cancion:', ''),
    autor: prompt('Autor de la cancion:', ''),
    anio: prompt('Año de la cancion:', '')
};





