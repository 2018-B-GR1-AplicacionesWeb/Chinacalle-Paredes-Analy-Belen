
//Tipados Int edad =1
var edad = 1;       //number
var sueldo = 1.01;  //number
var nombre = "Analy"; //== 'analy'  `analy`     //string
var casado = false;     //boolean
var hijos = null;       //object
var cuatroBrazos;       //undefined --> en tipo y valor
var fecha = new Date(); //Object --Instancia de una clase
console.log(typeof fecha);
console.log('fecha', fecha); //imprimir el valor
var analyJSON = {
    "nombre":"Analy",
    "edad": 21,
    "sueldo": 0.0,
    "casado": false,
    "hijos": null,
    "mascota":{
        "nombre":"Meow"
    }
};      //object

var analy = {
  'nombre': 'Analy',
  edad: 21,
  sueldo: 0.0,
  casado: false,
  hijos: null,
  deberes: undefined,
  mascota: {
      nombre: 'Meow'
  },
};
console.log(analy.nombre); // imprime Analy
//truthy        --> Strings / 1 / -1 /números   /Objetos
//falsy         --> 0   /null   /undefined
if(undefined){
    console.log("Si");
}else{
    console.log("No");
}