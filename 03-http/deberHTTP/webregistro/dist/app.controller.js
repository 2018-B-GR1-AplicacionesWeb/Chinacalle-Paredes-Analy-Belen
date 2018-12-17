"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const cancion_service_1 = require("./cancion.service");
let AppController = class AppController {
    constructor(appService, _cancionService) {
        this.appService = appService;
        this._cancionService = _cancionService;
        this.canciones = [
            {
                "id": 1,
                "nombre": "cancion1",
                "autor": {
                    "id": 1,
                    "nombre": "autor1"
                },
                "anio": "2000"
            },
            {
                "id": 2,
                "nombre": "cancion2",
                "autor": {
                    "id": 2,
                    "nombre": "autor2"
                },
                "anio": "2018"
            },
            {
                "id": 3,
                "nombre": "cancion3",
                "autor": {
                    "id": 3,
                    "nombre": "autor3"
                },
                "anio": "2003"
            },
            {
                "id": 4,
                "nombre": "cancion4",
                "autor": {
                    "id": 4,
                    "nombre": "autor4"
                },
                "anio": "2004"
            }
        ];
    }
    ;
    raices(nada) {
        return this.appService.root();
    }
    raiz(todosQueryParams, nombre) {
        console.log(todosQueryParams);
        return 'Hola Metrocida ' + nombre;
    }
    inicio(response) {
        response.render('inicio', {
            canciones: this.canciones,
            booleano: false
        });
    }
    crearCancionRuta(response) {
        response.render('crear-cancion');
    }
    crearCancionFuncion(response, cancion) {
        const respuesta = this._cancionService.crear(cancion);
        response.redirect('/inicio');
        return respuesta;
    }
    eliminar(response, nombreCancion) {
        this._cancionService.eliminar(nombreCancion).then((base) => {
            console.log(JSON.stringify(base));
        });
        response.redirect('/inicio');
    }
    actualizar(response, nombreCancion, nuevaCancion) {
        this._cancionService.actualizar(nombreCancion, nuevaCancion);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "raices", null);
__decorate([
    common_1.Get(),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "raiz", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    common_1.Get('crear-cancion'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearCancionRuta", null);
__decorate([
    common_1.Post('crear-cancion'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearCancionFuncion", null);
__decorate([
    common_1.Post('eliminar/nombreCancion'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminar", null);
__decorate([
    common_1.Post('actualizar/nombreCancion'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizar", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        cancion_service_1.CancionService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map