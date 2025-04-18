import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreatePrestamoDto } from 'src/dtos/prestamo/create-prestamo.dto';
import { HistorialService } from './historial.services';
import { CreateHistorialDto } from 'src/dtos/historial/create-historial.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('movimientos')
export class MovimientoController {
  constructor(
    private readonly movimientoService: MovimientoService,
    private readonly historialService: HistorialService,
    private readonly usuarioService: UsuarioService
  ) {}

  validaRol(rol: string, conteoPrestamo: number) {
    if (
      (rol == 'administrativo' && conteoPrestamo < 1) ||
      (rol == 'profesor' && conteoPrestamo < 3) ||
      (rol == 'estudiante' && conteoPrestamo < 5)
    ) {
      return true;
    }
    return false;
  }

  @Post('/prestar')
  @ApiOperation({ summary: 'Crear prestamo' })
  @ApiResponse({ status: 201, description: 'Prestamo registrado correctamente' })
  async prestamo(@Body() createPrestamoDto: CreatePrestamoDto) {
    const usuario = await this.usuarioService.findOne(createPrestamoDto.fk_usuario);
    const conteo = await this.movimientoService.contarPrestamos(createPrestamoDto.fk_usuario);

    const puedePrestar = this.validaRol(usuario.rol, conteo);
    if (!puedePrestar) {
      throw new Error('No puede prestar más materiales');
    }

    const respuestaPrestamo = await this.movimientoService.createPrestamo(createPrestamoDto);

    const registrarHistorial: CreateHistorialDto = {
      ...createPrestamoDto,
      fecha_de_registro: new Date(),
      tipo_de_movimiento: 'prestamo',
    };

    await this.historialService.createHistorial(registrarHistorial);

    return respuestaPrestamo;
  }

  @Post('/devolucion')
  @ApiOperation({ summary: 'Crear devolución' })
  @ApiResponse({ status: 201, description: 'Devolución realizada correctamente' })
  async devolucion(@Body() createPrestamoDto: CreatePrestamoDto) {
    const respuestaDevolucion = await this.movimientoService.removePrestamo(
      createPrestamoDto.fk_usuario,
      createPrestamoDto.fk_material
    );

    const registrarHistorial: CreateHistorialDto = {
      ...createPrestamoDto,
      fecha_de_registro: new Date(),
      tipo_de_movimiento: 'devolucion',
    };

    await this.historialService.createHistorial(registrarHistorial);

    return respuestaDevolucion;
  }

  @Get('/historial')
  @ApiOperation({ summary: 'Historial de movimientos' })
  findAllHistorial() {
    return this.historialService.findHistorial();
  }
}
