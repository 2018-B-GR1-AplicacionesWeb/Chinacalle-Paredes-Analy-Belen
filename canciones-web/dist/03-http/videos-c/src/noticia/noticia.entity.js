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
const pagina_entity_1 = require("../pagina/pagina.entity");
let NoticiaEntity = class NoticiaEntity {
    primerConsole() {
        console.log('Primer console');
    }
    segundoConsole() {
        console.log(`El titulo es: ${this.titulo}`);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], NoticiaEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({
        name: 'titulo_noticia',
        type: "varchar",
        length: 50
    }),
    __metadata("design:type", String)
], NoticiaEntity.prototype, "titulo", void 0);
__decorate([
    typeorm_1.Column({
        name: 'descripcion_noticia',
        type: "varchar",
        length: 250
    }),
    __metadata("design:type", String)
], NoticiaEntity.prototype, "descripcion", void 0);
__decorate([
    typeorm_1.OneToMany(type => pagina_entity_1.PaginaEntity, pagina => pagina.noticia),
    __metadata("design:type", Array)
], NoticiaEntity.prototype, "paginas", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NoticiaEntity.prototype, "primerConsole", null);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NoticiaEntity.prototype, "segundoConsole", null);
NoticiaEntity = __decorate([
    typeorm_1.Entity('noticia')
], NoticiaEntity);
exports.NoticiaEntity = NoticiaEntity;
//# sourceMappingURL=noticia.entity.js.map