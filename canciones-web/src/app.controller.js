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
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.root = function () {
        return this.appService.root();
    };
    AppController.prototype.mostrarLogin = function (res) {
        res.render('login');
    };
    AppController.prototype.autenticar = function () { };
    __decorate([
        common_1.Get()
    ], AppController.prototype, "root", null);
    __decorate([
        common_1.Get('login'),
        __param(0, common_1.Res())
    ], AppController.prototype, "mostrarLogin", null);
    __decorate([
        common_1.Post('login')
    ], AppController.prototype, "autenticar", null);
    AppController = __decorate([
        common_1.Controller()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
