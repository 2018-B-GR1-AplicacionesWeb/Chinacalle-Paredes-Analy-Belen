"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cancion_entity_1 = require("./cancion-entity");
const cancion_service_1 = require("./cancion.service");
let NoticiaModule = class NoticiaModule {
};
NoticiaModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule
                .forFeature([
                cancion_entity_1.CancionEntity
            ])
        ],
        controllers: [],
        providers: [
            cancion_service_1.CancionService
        ],
        exports: [
            cancion_service_1.CancionService
        ]
    })
], NoticiaModule);
exports.NoticiaModule = NoticiaModule;
//# sourceMappingURL=cancion.module.js.map