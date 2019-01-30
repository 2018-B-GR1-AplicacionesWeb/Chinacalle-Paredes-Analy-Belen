import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import {CancionEntity} from "./cancion.entity";
import {CancionService} from "./cancion.service";
import {CancionController} from "./cancion.controller";

@Module(
    {
        imports:[
            TypeOrmModule.forFeature(
                    [
                        CancionEntity
                    ]
            )],
        controllers:[
            CancionController
        ],
        providers:[
            CancionService
        ],
        exports:[
            CancionService
        ]
    }
)
export class CancionModule {
    
}