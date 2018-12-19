import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {Base, Cancion} from "./app.controller";
const fs = require('fs');


@Injectable()
export class CancionService {
    NOMBRE_BD = 'canciones.json';
   /* arreglo: Cancion[] = [
        {
            idCancion: 1,
            nombre: 'cancion1',
            autor: {
                idAutor: 1,
                nombre: 'autor1'
            },
            anio: 2011
        }
    ]; */

    promesaLeer = (): Promise<Base> => {
        // @ts-ignore
        return new Promise(
            (resolve) => {
                fs.readFile(
                    'cancionesPrueba.json',
                    'utf-8',
                    (error, contenidoLeido) => {
                        if (error) {
                            console.log('error');
                            resolve(
                                null
                            );
                        } else {
                            console.log('Leyo');
                            resolve(
                                JSON.parse(contenidoLeido)
                            );
                        }

                    }
                );
            }
        );
    };

    async leerPromesa(): Promise<Cancion[]> {
        try{
            const  bdd:Base = await this.promesaLeer();
            const canciones: Cancion[] = JSON.parse(JSON.stringify(bdd));
            return canciones;
            //return bdd;
        }catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje:'Error servidor'})
        }
    }

}