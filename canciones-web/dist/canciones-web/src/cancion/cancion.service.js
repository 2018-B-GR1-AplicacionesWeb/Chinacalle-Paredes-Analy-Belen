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
const typeorm_1 = require("@nestjs/typeorm");
const cancion_entity_1 = require("./cancion-entity");
const typeorm_2 = require("typeorm");
let CancionService = class CancionService {
    constructor(_cancionRepository) {
        this._cancionRepository = _cancionRepository;
    }
    buscar(parametrosBusqueda) {
        return this._cancionRepository.find(parametrosBusqueda);
    }
    crear(cancion) {
        const cancionEntity = this._cancionRepository
            .create(cancion);
        return this._cancionRepository.save(cancionEntity);
    }
    eliminar(idCancion) {
        const cancionAEliminar = this._cancionRepository
            .create({
            id: idCancion
        });
        return this._cancionRepository.remove(cancionAEliminar);
    }
    actualizar(nuevaCancion) {
        const cancionEntity = this._cancionRepository
            .create(nuevaCancion);
        return this._cancionRepository.save(cancionEntity);
    }
    buscarPorId(idCancion) {
        return this._cancionRepository.findOne(idCancion);
    }
};
CancionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(cancion_entity_1.CancionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CancionService);
exports.CancionService = CancionService;
//# sourceMappingURL=cancion.service.js.map