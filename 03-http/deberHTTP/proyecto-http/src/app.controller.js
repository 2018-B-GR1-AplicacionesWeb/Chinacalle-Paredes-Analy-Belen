var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Get, Controller, Res, Query } from '@nestjs/common';
let AppController = class AppController {
    constructor(appService, _cancionService) {
        this.appService = appService;
        this._cancionService = _cancionService;
    }
    root() {
        return this.appService.root();
    }
    inicio(response, accion, nombre) {
        let mensaje = undefined;
        if (accion && nombre) {
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
            }
        }
        let canciones = undefined;
        // @ts-ignore
        const arreglo = () => __awaiter(this, void 0, void 0, function* () {
            canciones = yield this._cancionService.leerPromesa();
            console.log('Canciones: \n' + JSON.stringify(canciones, null, 2));
        });
        response.render('inicio', {
            usuario: 'Analy',
            arreglo: canciones,
            booleano: false,
            mensaje: mensaje
        });
    }
};
__decorate([
    Get()
], AppController.prototype, "root", null);
__decorate([
    Get('inicio'),
    __param(0, Res()),
    __param(1, Query('accion')),
    __param(2, Query('nombre'))
], AppController.prototype, "inicio", null);
AppController = __decorate([
    Controller()
], AppController);
export { AppController };
