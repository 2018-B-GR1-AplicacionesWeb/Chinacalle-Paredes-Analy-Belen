import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {Base, Cancion} from "./app.controller";
const fs = require('fs');

@Injectable()
export class CancionService {
    NOMBRE_BD = 'C:\\Users\\analy.chinacalle\\Documents\\GitHub\\Chinacalle-Paredes-Analy-Belen\\03-http\\deberHTTP\\webregistro\\canciones.json';
    async listar(): Promise<Base> {
        const promesaLeer = (): Promise<Base> => {
            // @ts-ignore
            return new Promise(
                (resolve) => {
                    fs.readFile(
                        this.NOMBRE_BD,
                        'utf-8',
                        (error, contenidoLeido) => {
                            if (error) {
                                resolve(
                                    null
                                );
                            } else {
                                resolve(
                                    JSON.parse(contenidoLeido)
                                );
                            }

                        }
                    );
                }
            );
        };
        try{
            const  bdd:Base = await promesaLeer();
            return promesaLeer();
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje:'Error servidor'})
        }
    }
    async crear(cancion: Cancion): Promise<any> {
        const promesaLeer = (): Promise<Base> => {
            // @ts-ignore
            return new Promise(
                (resolve) => {
                    fs.readFile(
                        this.NOMBRE_BD,
                        'utf-8',
                        (error, contenidoLeido) => {
                            if (error) {
                                resolve(
                                    null
                                );
                            } else {
                                resolve(
                                    JSON.parse(contenidoLeido)
                                );
                            }

                        }
                    );
                }
            );
        };
        try{
            const  bdd:Base = await promesaLeer();
            const ultimoIndice = bdd.canciones.length;
            console.log(JSON.stringify(bdd));
            cancion.id= ultimoIndice+1;
            cancion.autor.id= ultimoIndice+1;
            bdd.canciones.push(cancion);
            //return promesaLeer();
            return guardarBase(bdd);
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje:'Error servidor'})

        }

    }

    async eliminar(nombreCancion: string): Promise<any> {
        const promesaLeer = (): Promise<Base> => {
            // @ts-ignore
            return new Promise(
                (resolve) => {
                    fs.readFile(
                        this.NOMBRE_BD,
                        'utf-8',
                        (error, contenidoLeido) => {
                            if (error) {
                                resolve(
                                    null
                                );
                            } else {
                                resolve(
                                    JSON.parse(contenidoLeido)
                                );
                            }

                        }
                    );
                }
            );
        };
        try{
            const  base = await promesaLeer();
            const contenido = JSON.stringify(base);
            const bdd = JSON.parse(contenido);

            const indiceCancion = buscarCancion(nombreCancion, bdd);
            console.log('indice' +indiceCancion);
            bdd.canciones
                .splice(indiceCancion, 1);
            console.log(JSON.stringify(bdd));
            return guardarBase(bdd);
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje:'Error servidor'})

        }

    }

    async actualizar(nombreCancion: string, nuevaCancion: Cancion): Promise<any> {
        const promesaLeer = (): Promise<Base> => {
            // @ts-ignore
            return new Promise(
                (resolve) => {
                    fs.readFile(
                        this.NOMBRE_BD,
                        'utf-8',
                        (error, contenidoLeido) => {
                            if (error) {
                                resolve(
                                    null
                                );
                            } else {
                                resolve(
                                    JSON.parse(contenidoLeido)
                                );
                            }

                        }
                    );
                }
            );
        };
        try{
            const  baseCanciones: Base = await promesaLeer();
            const contenido = JSON.stringify(baseCanciones);
            const baseC = JSON.parse(contenido);

            const indiceCancion = buscarCancion(nombreCancion, baseC);

            console.log('anti' +baseC.canciones[indiceCancion]);
            console.log('nueva: '+ nuevaCancion );
            baseC.canciones[indiceCancion] = nuevaCancion;

            console.log(JSON.stringify(baseC));
            return guardarBase(baseC);
            //return baseC;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje:'Error servidor'})

        }

    }



}
function buscarCancion(nombre: string, bdd: Base) {
    const contenidoActual = JSON.stringify(bdd);
    const baseActual = JSON.parse(contenidoActual);
    const indiceDeCancion = baseActual.canciones
        .findIndex(
            (cancion) => {
                return cancion.nombre === nombre;
            }
        );
    return indiceDeCancion;
}
function guardarBase(bdd: Base) {
    // @ts-ignore
    return new Promise(
        (resolve,reject)=> {
            fs.writeFile(
                this.NOMBRE_BD,
                JSON.stringify(bdd,null,2),
                (error) => {
                    if(error){
                        reject({Mensaje: 'error guardando', error: 500});
                    } else {
                        resolve({Mensaje: 'Base guardada'});
                    }
                }
            )
        }
    )
}

