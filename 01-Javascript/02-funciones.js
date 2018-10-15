
holaMundo();
function holaMundo() {
    console.log("Hola mundo");
}

console.log(holaMundo());  // devuelve undefined

function sumarDosNumeros(numUno,numDos) {
    var esNumeroUnoNumber = typeof numUno == 'number';
    var esNumeroDosNumber = typeof numDos == 'number';
    if(esNumeroUnoNumber && esNumeroDosNumber){
        return numUno+numDos;
    } else {
        console.error("No envía números");
        return 0;
    }

}

console.log(sumarDosNumeros(1,2));

console.log(sumarDosNumeros(1,2,3,4,5));
console.log(sumarDosNumeros('Analy',2,3,4,5));


//...
function sumarNNumeros(...numeros) {
    var tieneUnPArametroDiferenteDeNumber = false;
    var respuesta = sumarNumerosDesdeUnArreglo(numeros);

    if(respuesta.noEsNumber){
        console.error("No envía números");
        return 0;
    }
    else {
        return respuesta.resultado;
    }
}

function sumarNumerosDesdeUnArreglo(numeros){
    var tieneUnPArametroDiferenteDeNumber = false;
    var resultado =0;
    for(var i=0; i<numeros.length;i++){
        var esNumeroNumber = typeof numeros[i] == 'number';
        if(!esNumeroNumber){
            tieneUnPArametroDiferenteDeNumber = true;
        }else{
            resultado =resultado+numeros[i];
        }
    }
    var respuesta ={
        noEsNumber: tieneUnPArametroDiferenteDeNumber,
        resultado: resultado
    };
    return respuesta
}


console.log(sumarNNumeros(1,2,3,4,5));
console.log(sumarNNumeros(1,2,3,4,"Miau"));

function saludar(nombre, funcion) {
    return `Hola ${funcion(nombre)}`; // template strings  USAR FUNCIONES COMO PARAM
}
console.log(saludar("analy", convertirStringEnMayuscula));

function convertirStringEnMayuscula(texto){
    return texto.toUpperCase();
}
function convertirStringEnMinuscula(texto){
    return texto.toLowerCase();
}
function anadirPuntoAlFinal(texto){
    return texto + ".";
}
function primeraLetraEnMayuscula(texto) {
    var primeraLetraMayuscula = texto[0].toUpperCase();
    var restoPalabra = texto.slice(1, texto.length);
    return primeraLetraMayuscula + restoPalabra;
}
console.log(saludar("analy", primeraLetraEnMayuscula));

//console.log(saludarEnUpperCase("analy",holaMundo));  //función sin paréntesis es la definición de la función