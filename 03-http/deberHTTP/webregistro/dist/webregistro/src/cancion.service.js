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
const fs = require('fs');
let CancionService = class CancionService {
    constructor() {
        this.NOMBRE_BD = 'C:\\Users\\analy.chinacalle\\Documents\\GitHub\\Chinacalle-Paredes-Analy-Belen\\03-http\\deberHTTP\\webregistro\\canciones.json';
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
                throw new common_1.InternalServerErrorException({ mensaje: 'Error servidor' });
            }
        });
    }
    crear(cancion) {
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
                const ultimoIndice = bdd.canciones.length;
                console.log(JSON.stringify(bdd));
                cancion.id = ultimoIndice + 1;
                cancion.autor.id = ultimoIndice + 1;
                bdd.canciones.push(cancion);
                return guardarBase(bdd);
            }
            catch (e) {
                console.error(e);
                throw new common_1.InternalServerErrorException({ mensaje: 'Error servidor' });
            }
        });
    }
    eliminar(nombreCancion) {
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
                const base = yield promesaLeer();
                const contenido = JSON.stringify(base);
                const bdd = JSON.parse(contenido);
                const indiceCancion = buscarCancion(nombreCancion, bdd);
                console.log('indice' + indiceCancion);
                bdd.canciones
                    .splice(indiceCancion, 1);
                console.log(JSON.stringify(bdd));
                return guardarBase(bdd);
            }
            catch (e) {
                console.error(e);
                throw new common_1.InternalServerErrorException({ mensaje: 'Error servidor' });
            }
        });
    }
    actualizar(nombreCancion, nuevaCancion) {
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
                const baseCanciones = yield promesaLeer();
                const contenido = JSON.stringify(baseCanciones);
                const baseC = JSON.parse(contenido);
                const indiceCancion = buscarCancion(nombreCancion, baseC);
                console.log('anti' + baseC.canciones[indiceCancion]);
                console.log('nueva: ' + nuevaCancion);
                baseC.canciones[indiceCancion] = nuevaCancion;
                console.log(JSON.stringify(baseC));
                return guardarBase(baseC);
            }
            catch (e) {
                console.error(e);
                throw new common_1.InternalServerErrorException({ mensaje: 'Error servidor' });
            }
        });
    }
};
CancionService = __decorate([
    common_1.Injectable()
], CancionService);
exports.CancionService = CancionService;
function buscarCancion(nombre, bdd) {
    const contenidoActual = JSON.stringify(bdd);
    const baseActual = JSON.parse(contenidoActual);
    const indiceDeCancion = baseActual.canciones
        .findIndex((cancion) => {
        return cancion.nombre === nombre;
    });
    return indiceDeCancion;
}
function guardarBase(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile(this.NOMBRE_BD, JSON.stringify(bdd, null, 2), (error) => {
            if (error) {
                reject({ Mensaje: 'error guardando', error: 500 });
            }
            else {
                resolve({ Mensaje: 'Base guardada' });
            }
        });
    });
}
//# sourceMappingURL=cancion.service.js.map