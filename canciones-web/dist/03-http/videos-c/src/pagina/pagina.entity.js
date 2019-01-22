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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const noticia_entity_1 = require("../noticia/noticia.entity");
const articulo_entity_1 = require("../articulo/articulo.entity");
let PaginaEntity = class PaginaEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PaginaEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PaginaEntity.prototype, "numero", void 0);
__decorate([
    typeorm_1.ManyToOne(type => noticia_entity_1.NoticiaEntity, noticia => noticia.paginas),
    __metadata("design:type", noticia_entity_1.NoticiaEntity)
], PaginaEntity.prototype, "noticia", void 0);
__decorate([
    typeorm_1.OneToMany(type => articulo_entity_1.ArticuloEntity, articulo => articulo.pagina),
    __metadata("design:type", Array)
], PaginaEntity.prototype, "articulos", void 0);
PaginaEntity = __decorate([
    typeorm_1.Entity('pagina')
], PaginaEntity);
exports.PaginaEntity = PaginaEntity;
//# sourceMappingURL=pagina.entity.js.map