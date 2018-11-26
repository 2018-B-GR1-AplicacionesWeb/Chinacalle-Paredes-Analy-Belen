var arreglo = [];

arreglo = [
    1,
    "Adrian",
    false,
    null,
    new Date(),
    {
        nombre: "Analy"
    },
    [1, 2, false, true]
];

console.log(arreglo);
arreglo.push(3);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);

var arregloNumeros = [1, 2, 3, 4, 5];
//arregloNumeros.splice(1, 0, 1.1); // Posición, ElemABorrar, elemA añadir
console.log(arregloNumeros);
arregloNumeros.splice(2, 1);
console.log(arregloNumeros);

var indiceDelNumeroDos = arregloNumeros.indexOf(2);
console.log(indiceDelNumeroDos);

arregloNumeros.splice(indiceDelNumeroDos, 0, 1.2, 1.3, 1.4, 1.5, 1.6,1.7, 1.8, 1.9);
console.log(arregloNumeros);

var indiceUnoSiete = arregloNumeros.indexOf(1.7);
console.log(arregloNumeros[indiceUnoSiete]);
var posicionInicialUnoUno = arregloNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9);
var desdeElUnoUnoalUnoNueve = (posicionInicialUnoNueve-posicionInicialUnoUno)+1;
arregloNumeros.splice(
    posicionInicialUnoUno,
    desdeElUnoUnoalUnoNueve);
console.log(arregloNumeros);

var arregloArgumentos = [posicionInicialUnoUno,desdeElUnoUnoalUnoNueve];
arregloNumeros.splice(...arregloArgumentos);



//..............
var arregloUno = [1,2,3];
var arregloDos = [4,5,6];
//Destructuración de arreglos
console.log(...arregloUno); // == console.log(1,2,3)

var arregleCompleto = [...arregloUno,...arregloDos];
console.log(arregleCompleto);

var analy  = {
    nombre: "Analy",
    apellido: "Chinacalle",
    direccion: "Santa Anita",
    casado: false,
    edad:21
};
var any ={
    mascota:{
        nombre:"Meow"
    },
    fechaNacimiento: new Date("1996-12-26")
};

var datosDelUsuario={
    ...analy,
    ...any
};
console.log(datosDelUsuario);

//Objetos

var atributosDelObjeto = Object.keys(datosDelUsuario);

console.log(atributosDelObjeto);
console.log(datosDelUsuario["nombre"]);
console.log(datosDelUsuario[atributosDelObjeto[0]]);