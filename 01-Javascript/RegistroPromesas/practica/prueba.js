// declare var module:any;
const fs = require('fs');
const nombreArchivo = '01-Javascript/RegistroPromesas/datos.json'; //01-Javascript/RegistroPromesas/datos.json
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;
const filter = require('rxjs/operators').filter;
const scan = require('rxjs/operators').scan;
// @ts-ignore
const leerArchivoPromesa = new Promise((resolve) => {
    fs.readFile(nombreArchivo, 'utf-8', (err, contenidoArchivo) => {
        if (err) {
            resolve('{"ListaCanciones": []}'); //{"ListaCanciones": []}
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
//const observable$ =
leerArchivoPromesa
    .then((contenidoArchivo) => {
    const obj = JSON.stringify(contenidoArchivo);
    //const obj2 = (obj['ListaCanciones']);
    const datos = rxjs.of(obj);
    const observable$ = (datos);
    observable$
        .pipe(disctinct(), map((valor) => {
        console.log('Valor', valor);
        return {
            data: valor
        };
    }))
        .subscribe((ok) => {
        console.log('En ok', ok);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
    });
});
