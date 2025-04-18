import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { CreateMaterialDto } from 'src/dtos/material/create-material.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('material')
export class MaterialesController {
 constructor(
    private readonly materialServicio: MaterialesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear material' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
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
  @ApiOperation({ summary: 'Lista todos los materiales' })
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
  @ApiOperation({ summary: 'Lista un material' })
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
  @ApiOperation({ summary: 'Lista un actualiza un material' })
  update(@Param('identificador') identificador: string, @Body() body)  {
    return "update";
  }

  @Delete(':identificador')
  @ApiOperation({ summary: 'Lista un actualiza un material' })
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
