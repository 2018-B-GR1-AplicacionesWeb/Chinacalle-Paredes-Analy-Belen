
function ejemplo() {}
var ejemploDos = function () {}; //Anonynous function --> sin nombre
//console.log(typeof ejemploDos);
var arregloDeFunciones = [function () {
}];
console.log(typeof ejemplo); // Tipo de dato de la función
console.log(ejemplo);  // definición de la función
console.log(ejemplo()); //Ejecución de la función

var variableUno; //NUNCA USAR
let variableDos = 2; // USAR MUTABLE (se asigna a otro valor)
variableDos = variableDos +1;
const pi = 3.141516 // intentar usar siempre

//operadores

const analy = {
    nombre: 'Analy'
};
analy.nombre ='Any';
analy.edad = 21;

const casado = true;
//casado = false; No se puede cambiar booleanos
const apellido = '';
//apellido = '123' NO se puede cambiar strings
const edad = 30;
//edad = 20 NO se puede cambiar letrf
const arregloDeNombres = ['A','B','C'];

arregloDeNombres.forEach( //escribir código que se entienda
    function (valorActual, indiceActual, arreglo) {
        console.log('valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('arreglo', arreglo)

    }
);

//fat Arrow functions en lugar de las funciones anónimas
// -> flecha normal     => flecha gorda

arregloDeNombres.forEach( //escribir código que se entienda
     (valorActual, indiceActual, arreglo)=> {
        console.log('valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('arreglo', arreglo)

    }
);

const sumarDosNumeros =(numUno, numDos)=>{
    return numUno+numDos
};

const sumarDosNumerosV2 = (numUno, numDos) => numUno+numDos;

const elevarAlCuadrado = (numero) => numero*numero;

const elevarAlCuadradoV2 = numero => numero*numero;     //Con solo 1 parámetro --> sin parentesis


const arregloNombresDos = ['E','F','G','H'];

const resultado = arregloNombresDos.map(  //mutar cada elemento del arreglo
    valorActual => {
        return valorActual + '.';
    }
    )  // MAP Devuelve un arreglo
    .forEach(
        (valorNuevo) => console.log(valorNuevo)
    );  //undefined
console.log(resultado);

const arregloNumeros = [2,3,1,5,6,4,7,8,9,10];

const resultadoFilter = arregloNumeros
    .filter(n => (n % 2) ===0);
console.log(resultadoFilter);

if('1' === 1){ // falso
    console.log('Es verdad');
}else {
    console.log('Es falso');
}

//Every
const resultadoEvery = arregloNumeros
.every(n => n>1);   //SI todos los elementos cumplen devuelve TRUE, caso contrario FALSE
console.log(resultadoEvery);

// Some
const resultadoSome = arregloNumeros
    .some(n => n <0);   //SI uno cumple con la condición TRUE, caso contrario FALSE
console.log(resultadoSome);

const resultadoFindIndex = arregloNumeros
    .findIndex(n => n === 7);

console.log(resultadoFindIndex);  // Devuelve la posición
console.log(arregloNumeros.indexOf(7));  // devuelve la posición

const resultadoFind = arregloNumeros
    .find(n => n === 7);
console.log(resultadoFind);

const resultadoReduce = arregloNumeros
    .reduce(
        (valorActualDelNumero, valorActualDelArreglo)=>{   //1er parámetro acepta una funcion
            return valorActualDelNumero - valorActualDelArreglo
        },
        100   //Acepta un valor
    );
console.log(resultadoReduce);

const resultadoReduceV2 = arregloNumeros.reduce((a,b)=>a+b,0);
const resultadoReduceV3 = arregloNumeros.reduceRight((a,b, indice)=>{
    if (indice >4){
        return a+b;
    }else{
        return a;
    }
},0);

console.log(resultadoReduceV3);

//SORT
const clonArregloNumeros = JSON.parse(JSON.stringify(arregloNumeros));
console.log(clonArregloNumeros);
const resultadoSort = arregloNumeros.sort(((a, b) => a-b));
const resultadoSortV2 = clonArregloNumeros.sort(((a, b) => b-a));
console.log(resultadoSort);
console.log(resultadoSortV2);