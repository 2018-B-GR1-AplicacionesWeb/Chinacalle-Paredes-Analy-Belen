"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var AppController = /** @class */ (function () {
    function AppController(appService, _cancionService) {
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
    AppController.prototype.raices = function (nada) {
        return this.appService.root();
    };
    AppController.prototype.raiz = function (todosQueryParams, //{nombre: Analy}
    nombre) {
        console.log(todosQueryParams);
        return 'Hola Metrocida ' + nombre;
    };
    AppController.prototype.inicio = function (response) {
        response.render('inicio', {
            canciones: this.canciones,
            booleano: false
        });
    };
    AppController.prototype.crearCancionRuta = function (response) {
        response.render('crear-cancion');
    };
    AppController.prototype.crearCancionFuncion = function (response, cancion) {
        var respuesta = this._cancionService.crear(cancion);
        response.redirect('/inicio');
        return respuesta;
    };
    AppController.prototype.eliminar = function (response, nombreCancion) {
        this._cancionService.eliminar(nombreCancion).then(function (base) {
            console.log(JSON.stringify(base));
        });
        response.redirect('/inicio');
    };
    AppController.prototype.actualizar = function (response, nombreCancion, nuevaCancion) {
        this._cancionService.actualizar(nombreCancion, nuevaCancion);
    };
    __decorate([
        common_1.Get(),
        __param(0, common_1.Res())
    ], AppController.prototype, "raices", null);
    __decorate([
        common_1.Get() //Con esto se indica que el método se ejecuta cuando se haga un request con metodo get
        ,
        common_1.HttpCode(200) //status
        ,
        __param(0, common_1.Query()),
        __param(1, common_1.Query('nombre'))
    ], AppController.prototype, "raiz", null);
    __decorate([
        common_1.Get('inicio'),
        __param(0, common_1.Res())
    ], AppController.prototype, "inicio", null);
    __decorate([
        common_1.Get('crear-cancion'),
        __param(0, common_1.Res())
    ], AppController.prototype, "crearCancionRuta", null);
    __decorate([
        common_1.Post('crear-cancion'),
        __param(0, common_1.Res()),
        __param(1, common_1.Body())
    ], AppController.prototype, "crearCancionFuncion", null);
    __decorate([
        common_1.Post('eliminar/nombreCancion'),
        __param(0, common_1.Res()),
        __param(1, common_1.Param())
    ], AppController.prototype, "eliminar", null);
    __decorate([
        common_1.Post('actualizar/nombreCancion'),
        __param(0, common_1.Res()),
        __param(1, common_1.Param()),
        __param(2, common_1.Body())
    ], AppController.prototype, "actualizar", null);
    AppController = __decorate([
        common_1.Controller()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
