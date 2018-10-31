//import{paqueteUno, paqueteDos} from 'rxjs';
//import * as rxjs from 'rxjs';
//import {Observable} from "rxjs";
const rxjs = require('rxjs');
const observableUno$ = rxjs.of(1, 2, 3, 4, 5, 6, 7); //devuelve un observable
console.log(observableUno$);
observableUno$
    .subscribe((ok) => {
    console.log(ok);
}, (error) => {
    console.log(error);
}, () => {
    console.log('Completado');
});
