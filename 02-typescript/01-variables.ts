//instalar sudo npm install -g(carpeta donde esta// //t//odo el SO) typescript

const nombre:string = '';
const edad:number = 12;
const nada = null;
const casado:boolean = false;
let loQueSea:any = {};  // CUALQUIER TIPO
loQueSea = 1;
loQueSea = '';

const fechaDeNAcimiento:Date = new Date();

let identificador: number | string ='1';
identificador =1;
identificador = 'uno';

/*
const usuario :{        //definir el objeto
    nombre: string;
    apellido: string;
    edad?: number | string;      //? El parámetro es opcional!!
} =
    {
    nombre: 'Analy',
    apellido: 'Chinacalle'
};

*/
interface usuarioInterface {        //definir el objeto
    nombre: string;
    apellido: string;
    edad?: number | string;      //? El parámetro es opcional!!
}
class Usuario{    //Es mejor una interface que la clase para que no se añadan lineas de cod
    public nombre:string;
    public apellido:string;
    public edad?: number | string;
}
const usario:usuarioInterface=   {
        nombre: 'Analy',
        apellido: 'Chinacalle'
    };

function sumarDosNumeros(
    numeroUno: number,
    numeroDos: number
) {
    return numeroUno + numeroDos;
}

sumarDosNumeros(2,3);

const saludar = (nombre: string,
                 apellido?: string,
                 ...infinito:number[]):any=> {
    return 7;
};
//otra forma de hacer casteo let respuesta: string =saludar()
let respuesta =<string> saludar('any', 'chinacalle',3,4,5,6,);
respuesta = respuesta.toUpperCase();

let nombreDos  = 'Analy';       //duck type SI parece, suena, camina, ENTONCES es