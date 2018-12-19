import { Injectable } from '@nestjs/common';
import {Usuario} from "./app.controller";

@Injectable()
export class AppService {
  /*root(): string {
    return 'Hello World!';
    //algoooo
  }
  */

    bdd: Usuario[] = []; // reemplazar por archivo JSON

    crearUsuario(usuario: Usuario){
      this.bdd.push(usuario);
      return this.bdd;
    }
}
