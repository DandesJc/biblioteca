import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historial } from 'src/models/historial.entity';
import { CreateHistorialDto } from 'src/dtos/historial/create-historial.dto';


@Injectable()
export class HistorialService {
  constructor(
        @InjectRepository(Historial)
        private readonly historialRepository: Repository<Historial>,
      ){}

    async createHistorial(historial:CreateHistorialDto): Promise<Historial> { 
        const historialDato = await this.historialRepository.create(historial);
        return this.historialRepository.save(historialDato);
    }

    async findHistorial(): Promise<Historial[]> { 

        return await this.historialRepository.find();

    }

}
