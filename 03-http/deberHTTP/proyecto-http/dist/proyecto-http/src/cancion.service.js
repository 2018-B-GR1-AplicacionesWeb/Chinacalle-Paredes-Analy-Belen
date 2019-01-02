"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
let CancionService = class CancionService {
    constructor() {
        this.NOMBRE_BD = 'canciones.json';
        this.arreglo = [
            {
                idCancion: 1,
                nombre: 'cancion1',
                autor: {
                    idAutor: 1,
                    nombre: 'autor1'
                },
                anio: 2011
            }
        ];
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const promesaLeer = () => {
                return new Promise((resolve) => {
                    fs.readFile(this.NOMBRE_BD, 'utf-8', (error, contenidoLeido) => {
                        if (error) {
                            resolve(null);
                        }
                        else {
                            resolve(JSON.parse(contenidoLeido));
                        }
                    });
                });
            };
            try {
                const bdd = yield promesaLeer();
                return promesaLeer();
            }
            catch (e) {
                console.error(e);
                throw new InternalServerErrorException({ mensaje: 'Error servidor' });
            }
        });
    }
};
CancionService = __decorate([
    common_1.Injectable()
], CancionService);
exports.CancionService = CancionService;
//# sourceMappingURL=cancion.service.js.map