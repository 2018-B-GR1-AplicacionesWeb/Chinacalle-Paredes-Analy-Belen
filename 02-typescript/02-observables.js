//import{paqueteUno, paqueteDos} from 'rxjs';
//import * as rxjs from 'rxjs';
//import {Observable} from "rxjs";
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const observableUno$ = rxjs.of([1, 2, 3], 'Hola', 3, true, 5, new Date(), 7); //devuelve un observable
console.log(observableUno$);
observableUno$
    .pipe(map((valor) => {
    console.log('valor: ', valor);
    return {
        data: valor
    };
}));
const promesita = () => {
    return new Promise((resolve, reject) => {
        reject(':C');
    });
};
async function ejecutarCodigoSyncrono() {
    console.log('Inicio');
    try {
        const resultadoPromesita = await promesita();
        console.log(resultadoPromesita);
    }
    catch (e) {
        console.log('Error ', e);
    }
    console.log('Fin');
}
ejecutarCodigoSyncrono();
