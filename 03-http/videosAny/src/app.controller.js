var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
//Controlador --> gestiona comunicacion (peticiones http)
import { Get, Controller, HttpCode, InternalServerErrorException, Post, Query, Param, Body, Headers, UnauthorizedException, Req, Res } from '@nestjs/common';
//import {async} from "rxjs/internal/scheduler/async";
import { of } from "rxjs";
//COntrolador gestiona Request y Response
let AppController = class AppController {
    constructor(_appService, _noticiaService) {
        this._appService = _appService;
        this._noticiaService = _noticiaService;
        this.numeroRegistro = 5;
    } //NO ES UN CONSTRUCTOR
    //constructor es la forma de inyectar dependencias
    //http://ip:puerto
    raiz(todosQueryParams, //{nombre: Analy}
    nombre) {
        console.log(todosQueryParams);
        return 'Hola Metrocida ' + nombre;
    }
    parametroRuta(id) {
        return id;
    }
    adiosMundo() {
        return 'Adios Mundo';
    }
    adiosMundoPost(response) {
        response.render('inicio', {
            usuario: 'Analy',
            arreglo: [],
            booleano: true
        });
    }
    adiosMundoPromesa() {
        const promesaAdios = () => {
            return new Promise((resolve) => {
                resolve('AdiosMundo');
            });
        };
        return promesaAdios();
    }
    async adiosMundoAsync() {
        const promesaAdios = () => {
            return new Promise((resolve, reject) => {
                reject('AdiosMundo');
            });
        };
        try {
            const respuesta = await promesaAdios();
            return promesaAdios();
        }
        catch (e) {
            console.error(e);
            throw new InternalServerErrorException({ mensaje: 'Error servidor' });
        }
    }
    adiosMundoObservable() {
        const respuesta2$ = of('adios Mundo');
        return respuesta2$;
    }
    crearUSuario(usuario, nombre, cabeceras, //Es lo que manda el cliente Cabeceras de peticion
    codigo, // Cabecera de peticion
    res, //Si se usa ya no usar nest
    req) {
        //crear usuario
        console.log('Cookies: ', req.cookies); //LEIDO
        console.log('Cookies seguras ', req.signedCookies);
        console.log(usuario);
        console.log(cabeceras);
        if (codigo === '1234') {
            const bdd = this._appService.crearUsuario(usuario);
            res.append('token', '5678');
            res.cookie('app', 'web'); //INSEGURA
            res.cookie("segura", "secreto", {
                signed: true
            });
            res.json(bdd);
            //          return 'ok';
        }
        else {
            throw new UnauthorizedException({
                mensaje: 'Error de autorización',
                error: 401
            });
        }
    }
    inicio(response) {
        response.render('inicio', {
            usuario: 'Analy',
            arreglo: this._noticiaService.arreglo,
            booleano: false
        });
    }
    crearNoticiaRuta(response) {
        response.render('crear-noticia');
    }
    crearNoticiaFunction(response, noticia) {
        this._noticiaService.crear(noticia);
        response.redirect('/inicio');
    }
    //Todos los parametros que llegan de ruta son de tipo string
    eliminar(response, idNoticia) {
        this._noticiaService.eliminar(Number(idNoticia));
        response.redirect('/inicio');
    }
};
__decorate([
    Get() //Con esto se indica que el método se ejecuta cuando se haga un request con metodo get
    ,
    HttpCode(200) //status
    ,
    __param(0, Query()),
    __param(1, Query('nombre'))
], AppController.prototype, "raiz", null);
__decorate([
    Get('segmentoUno/segmentoDos/:idUsuario') //Parametro ruta
    ,
    __param(0, Param('idUsuario'))
], AppController.prototype, "parametroRuta", null);
__decorate([
    Get('adiosMundo')
], AppController.prototype, "adiosMundo", null);
__decorate([
    Post('adiosMundo'),
    __param(0, Res())
], AppController.prototype, "adiosMundoPost", null);
__decorate([
    Get('adiosMundoPromesa')
], AppController.prototype, "adiosMundoPromesa", null);
__decorate([
    Get('adiosMundoAsync'),
    HttpCode(201) //Si sale bien se envía este codigoooooooooooo
], AppController.prototype, "adiosMundoAsync", null);
__decorate([
    Get('adiosMundoObservable')
], AppController.prototype, "adiosMundoObservable", null);
__decorate([
    Post('crearUsuario'),
    __param(0, Body()),
    __param(1, Body('nombre')),
    __param(2, Headers()),
    __param(3, Headers('seguridad')),
    __param(4, Res()),
    __param(5, Req())
], AppController.prototype, "crearUSuario", null);
__decorate([
    Get('inicio'),
    __param(0, Res())
], AppController.prototype, "inicio", null);
__decorate([
    Get('crear-noticia'),
    __param(0, Res())
], AppController.prototype, "crearNoticiaRuta", null);
__decorate([
    Post('crear-noticia'),
    __param(0, Res()),
    __param(1, Body())
], AppController.prototype, "crearNoticiaFunction", null);
__decorate([
    Post('eliminar/:idNoticia'),
    __param(0, Res()),
    __param(1, Param('idNoticia'))
], AppController.prototype, "eliminar", null);
AppController = __decorate([
    Controller() //decorador   --> @nombre(paréntesis)   Es una función
], AppController);
export { AppController };
/////////////////////       CONSULTA
/*
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: '',
    templateUrl: './abc.html',
    styleUrls: ['./abc.less']
})
export class AbcComponent implements OnInit {
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        // get param
        let param1 = this.route.snapshot.queryParams["param1"];
    }
}

*/ 
