import { Body, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from 'src/dtos/usuario/create-usuario.dto';
import { Usuario } from 'src/models/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ){}
    
    async create(usuario:CreateUsuarioDto): Promise<Usuario> { 
        const usuarioDato = await this.usuarioRepository.create(usuario);
        return this.usuarioRepository.save(usuarioDato);
    }

    async findAll(): Promise<Usuario[]> { 

        return await this.usuarioRepository.find();

    }

    async findOne(cedula: string): Promise<Usuario> { 
        const usuarioDato = await this.usuarioRepository.findOne({where: {cedula: cedula}});
        if(!usuarioDato) {
            throw new HttpException(
                "User Not Found",
                404,
            )
        }
        return usuarioDato;
    }


    async remove(cedula: string): Promise<Usuario> { 
        const usuarioExistente = await this.findOne(cedula);
        return await this.usuarioRepository.remove(usuarioExistente);
    }

}
