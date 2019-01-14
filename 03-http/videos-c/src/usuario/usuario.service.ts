import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {FindOneOptions, Repository} from "typeorm";

@Injectable()
export class UsuarioService {
    //Inyectar dependencias
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository:
            Repository<UsuarioEntity>
    ){}

    async autenticar(username: string,
               password: string): Promise<boolean>{
        //password encriptado
        //encriptar password q llega y enviar
        const consulta: FindOneOptions<UsuarioEntity>={
            where:{
                username: username,
                password: password
            }
        };
        const respuesta = await this._usuarioRepository.findOne(consulta);
        if(respuesta){
            return true
        }else{
            return false
        }

    }
}