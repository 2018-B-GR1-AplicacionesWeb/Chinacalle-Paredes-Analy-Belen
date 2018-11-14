declare var require: any;
const inquirer = require('inquirer');
const fs = require('fs');
const preguntaMenu = {
    type: 'list',
    name:'opcionMenu',
    message: 'Qué desea hacer',
    chioces: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Imprimir'
    ]
};
const preguntasUsuario = {

};

// @ts-ignore
async function main() {
    try{
        const respuesta = await inquirer.prompt(preguntaMenu);
        switch(respuesta){
            case 'Crear':
                console.log('Pedir datos');
                const respuestaUsuario = await inquirer.prpmpt(preguntasUsuario);
                break;
        }


    }catch (e) {
        console.log('Error');
    }
}

function inicializarBase() {
    // @ts-ignore
    return new Promise(
        (resolve,reject)=> {
            fs.readFile('bdd.json','utf-8',
                (err, contenido)=> {
                    if(err){
                        fs.writeFile('bdd.son',
                            '{"usuarios":[]}',
                            (err) => {
                            if(err){
                                reject()
                            }
                            resolve('ok');
                            });
                    }else{

                    }
                })
        }
    )
}
