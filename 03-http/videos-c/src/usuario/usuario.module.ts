import {Module} from "@nestjs/common";
import{TypeOrmModule} from "@nestjs/typeorm"
import {UsuarioService} from "./usuario.service";
@Module({
    imports:[
        TypeOrmModule
            .forFeature()
    ],
    providers:[
        UsuarioService
    ],
    exports:[
        UsuarioService
    ]

})
export class UsuarioModule {

}