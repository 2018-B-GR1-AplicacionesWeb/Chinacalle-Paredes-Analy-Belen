const calculadora = require('./02-calculadora.js');
const util = require('../05-nodejs-02/01-util');
const tiempo = require('./tiempo/01-tiempo');
const fs = require('fs');       //no necesario descargar    Viene x defecto
const express = require('express'); // Si descargar

console.log('calculadora', calculadora.nombreCalculadora);
console.log('calculadora',calculadora.sumarDosNumeros(2,5));
console.log('tiempo', tiempo);
console.log('express', express);
console.log('util', util);