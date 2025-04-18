import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from 'src/models/prestamo.entity';
import { Repository } from 'typeorm';
import { CreatePrestamoDto } from 'src/dtos/prestamo/create-prestamo.dto';
import { Usuario } from 'src/models/usuario.entity';
import { Material } from 'src/models/material.entity';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,

    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async createPrestamo(prestamo: CreatePrestamoDto): Promise<Prestamo> {
    const material = await this.materialRepository.findOneBy({identificador: prestamo.fk_material });

    if (!material || material.cantidad_actual <= 0) {
      throw new HttpException("Material no disponible para préstamo", 400);
    }

    const prestamoDato = this.prestamoRepository.create(prestamo);
    await this.prestamoRepository.save(prestamoDato);

    material.cantidad_actual -= 1;
    await this.materialRepository.save(material);

    return prestamoDato;
  }

  async findPrestamos(): Promise<Prestamo[]> {
    return await this.prestamoRepository.find();
  }

  async contarPrestamos(fk_usuario: string): Promise<number> {
    return await this.prestamoRepository.countBy({ fk_usuario: fk_usuario });
  }

  async findOnePrestamo(fk_usuario: string, fk_material: string): Promise<Prestamo | null> {
    const prestamoDato = await this.prestamoRepository.findOneBy({
      fk_usuario: fk_usuario,
    });

    if (!prestamoDato) {
      throw new HttpException("Prestamo Not Found", 404);
    }
    return prestamoDato;
  }

  async removePrestamo(fk_usuario: string, fk_material: string) {
    const result = await this.prestamoRepository.delete({ fk_usuario, fk_material });

    const material = await this.materialRepository.findOneBy({ identificador: fk_material });
    if (material) {
      material.cantidad_actual += 1;
      await this.materialRepository.save(material);
    }

    return result;
  }
}

