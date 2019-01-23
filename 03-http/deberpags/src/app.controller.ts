import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    root() {
        return 'root'

    //return this.appService.root();
    }
    @Get('inicio')
    inicio(){
        return 'Inicio'
    }
}
