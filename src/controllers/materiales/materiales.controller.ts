import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { CreateMaterialDto } from 'src/dtos/material/create-material.dto';

@Controller('material')
export class MaterialesController {
 constructor(
    private readonly materialServicio: MaterialesService
  ) {}

  @Post()
  async create(@Body() material: CreateMaterialDto) {
    try {
      await this.materialServicio.create(material);
      return {
        success: true,
        massage: "Material Created Succesfully"
      };
    }
    catch(e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const material = await this.materialServicio.findAll();
      return material;
    }
    catch(e) {
      return {
        success: false,
        message: e.message,
      }
    }
  }

  @Get(':identificador')
  async findOne(@Param('identificador') identificador: string) {
    try {
      const material = await this.materialServicio.findOne(identificador);
      return {
        usuario: material
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Patch(':identificador')
  update(@Param('identificador') identificador: string, @Body() body)  {
    return "update";
  }

  @Delete(':identificador')
  async remove(@Param('identificador') identificador: string) {
    try {
      const material = await this.materialServicio.remove(identificador);
      return {
        usuario: material
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
