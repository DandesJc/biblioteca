import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMaterialDto } from 'src/dtos/material/create-material.dto';
import { Material } from 'src/models/material.entity';
import { Repository } from 'typeorm';

//const Material

@Injectable()
export class MaterialesService {
constructor(
        @InjectRepository(Material)
        private readonly materialRepository: Repository<Material>
    ){}
    
    async create(material:CreateMaterialDto): Promise<Material> { 
        material.fecha_de_regitro = new Date(Date.now())
        const materialDato = await this.materialRepository.create(material);
        return this.materialRepository.save(materialDato);
    }

    async findAll(): Promise<Material[]> { 

        return await this.materialRepository.find();

    }

    async findOne(identificador: string): Promise<Material> { 
        const materialDato = await this.materialRepository.findOne({where: {identificador: identificador}});
        if(!materialDato) {
            throw new HttpException(
                "Material Not Found",
                404,
            )
        }
        return materialDato;
    }


    async remove(identificador: string): Promise<Material> { 
        const materialExistente = await this.findOne(identificador);
        return await this.materialRepository.remove(materialExistente);
    }
}
