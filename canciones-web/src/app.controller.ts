import {Get, Controller, Res, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }
  @Get('login')
    mostrarLogin(
        @Res() res
  ){
      res.render('login');
  }
  @Post('login')
    autenticar(){}
}
export interface Usuario {
    nombre: string
}
export interface Cancion {
    id?: number;
    nombre: string
}