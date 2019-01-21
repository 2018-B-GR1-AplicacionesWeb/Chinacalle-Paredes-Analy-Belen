import {Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import {CancionEntity} from "./cancion-entity";
import {CancionService} from "./cancion.service";

@Module(
    {
        imports:[
            TypeOrmModule
                .forFeature(
                    [
                        CancionEntity
                    ]
                )
        ],
        controllers:[

        ],
        providers:[
            CancionService
        ],
        exports:[
            CancionService
        ]
    }
)
export class NoticiaModule {

}