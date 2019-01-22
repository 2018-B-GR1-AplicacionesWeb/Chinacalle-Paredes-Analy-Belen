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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cancion_service_1 = require("./cancion.service");
const typeorm_1 = require("typeorm");
let CancionController = class CancionController {
    constructor(_cancionService) {
        this._cancionService = _cancionService;
    }
    inicio(response, busqueda, accion, nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje = undefined;
            if (accion && nombre) {
                switch (accion) {
                    case 'borrar':
                        mensaje = `Registro ${nombre} eliminado`;
                }
            }
            let canciones;
            if (busqueda) {
                const consulta = {
                    where: [
                        {
                            nombre: typeorm_1.Like(`%${busqueda}`)
                        }
                    ]
                };
                canciones = yield this._cancionService.buscar(consulta);
            }
            else {
                canciones = yield this._cancionService.buscar();
            }
            response.render('inicio', {
                usuario: 'Analy',
                arreglo: canciones,
                booleano: false,
                mensaje: mensaje
            });
        });
    }
    eliminar(response, idCancion) {
        return __awaiter(this, void 0, void 0, function* () {
            const cancion = yield this._cancionService.buscarPorId(+idCancion);
            yield this._cancionService.eliminar(Number(idCancion));
        });
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('busqueda')),
    __param(2, common_1.Query('accion')),
    __param(3, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CancionController.prototype, "inicio", null);
__decorate([
    common_1.Post('eliminar/:idCancion'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idCancion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CancionController.prototype, "eliminar", null);
CancionController = __decorate([
    common_1.Controller('cancion'),
    __metadata("design:paramtypes", [cancion_service_1.CancionService])
], CancionController);
exports.CancionController = CancionController;
//# sourceMappingURL=cancion.controller.js.map