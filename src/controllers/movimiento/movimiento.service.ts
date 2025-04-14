import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from 'src/models/prestamo.entity';
import { Repository } from 'typeorm';
import { CreatePrestamoDto } from 'src/dtos/prestamo/create-prestamo.dto';
import { Usuario } from 'src/models/usuario.entity';


@Injectable()
export class MovimientoService {
  constructor(
        @InjectRepository(Prestamo)
        private readonly prestamoRepository: Repository<Prestamo>,
      ){}
      
    async createPrestamo(prestamo:CreatePrestamoDto): Promise<Prestamo> {
        const prestamoDato = await this.prestamoRepository.create(prestamo);
        return this.prestamoRepository.save(prestamoDato);
    }

    async findPrestamos(): Promise<Prestamo[]> { 

        return await this.prestamoRepository.find();

    }


    async contarPrestamos(fk_usuario: string): Promise<number> { 

        return await this.prestamoRepository.countBy({fk_usuario:fk_usuario});

    }

    async findOnePrestamo(fk_usuario: string, fk_material: string): Promise<Prestamo | null> { 
        const prestamoDato = await this.prestamoRepository.findOneBy(
            {fk_usuario: fk_usuario,
             //fk_material: fk_material
            });


        if(!prestamoDato) {
            throw new HttpException(
                "Prestamo Not Found",
                404,
            )
        }
        return prestamoDato;
    }


    async removePrestamo(fk_usuario: string, fk_material: string) { 
        //const prestamoExistente = await this.findOnePrestamo(fk_usuario, fk_material);
        const prestamoDato = await this.prestamoRepository.delete({fk_usuario, fk_material});
        console.log(prestamoDato)
    }

}
