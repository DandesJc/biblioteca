import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dtos/usuario/create-usuario.dto';
import { UsuarioService } from './usuario.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { UsuarioService } from './usuario.service';
// import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioServicio: UsuarioService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({ status: 201, description: 'Prestamo registrado correctamente' })
  async create(@Body() usuario: CreateUsuarioDto) {
    try {
      await this.usuarioServicio.create(usuario);
      return {
        success: true,
        massage: "User Created Succesfully"
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
  @ApiOperation({ summary: 'Listar todo los usuarios' })
  async findAll() {
    try {
      const usuarios = await this.usuarioServicio.findAll();
      return usuarios;
    }
    catch(e) {
      return {
        success: false,
        message: e.message,
      }
    }
  }

  @Get(':cedula')
  @ApiOperation({ summary: 'Listar usuario por cedula' })
  async findOne(@Param('cedula') cedula: string) {
    try {
      const usuario = await this.usuarioServicio.findOne(cedula);
      return {
        usuario
      }
    }
    catch(e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body)  {
    return "update";
  }

  @Delete(':cedula')
  @ApiOperation({ summary: 'Eliminar usuario por cedula' })
  async remove(@Param('cedula') cedula: string) {
    try {
      const usuario = await this.usuarioServicio.remove(cedula);
      return {
        usuario
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
