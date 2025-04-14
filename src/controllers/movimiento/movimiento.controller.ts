import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreatePrestamoDto } from 'src/dtos/prestamo/create-prestamo.dto';
import { HistorialService } from './historial.services';
import { CreateHistorialDto } from 'src/dtos/historial/create-historial.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateUsuarioDto } from 'src/dtos/usuario/create-usuario.dto';

@Controller('movimientos')
export class MovimientoController {
  constructor(
    private readonly movimientoService: MovimientoService,
    private readonly historialService: HistorialService,
    private readonly usuarioService: UsuarioService 
  ) {}


  validaRol(rol:string, conteoPrestamo: number) {
    if(rol == "administrativo" && conteoPrestamo == 1 || 
       rol == "profesor" && conteoPrestamo <= 3 || 
       rol == "estudiante" && conteoPrestamo <= 5) {
        return true
    }
    return false;
  }

  @Post("/prestar")
  prestamo(@Body() createPrestamoDto: CreatePrestamoDto) {
    
    const usuarioRol: Promise<CreateUsuarioDto> | string = this.usuarioService.findOne(createPrestamoDto.fk_usuario);
    const usuarioPrestamos: Promise <number> = this.movimientoService.contarPrestamos (createPrestamoDto.fk_usuario) || -1
    this.validaRol(usuarioRol.rol ?? "",  usuarioPrestamos)
    
    const respuestaPrestamo = this.movimientoService.createPrestamo(createPrestamoDto);
    const registrarHistorial: CreateHistorialDto  = {
      ...createPrestamoDto,
      fecha_de_registro: new Date(Date.now()),
      tipo_de_movimiento: "prestamo"
    };
    this.historialService.createHistorial(registrarHistorial)
    return respuestaPrestamo;
  }


  @Post("/devolucion")
  devolucion(@Body() createPrestamoDto: CreatePrestamoDto) {
    const respuestaDevolucion = this.movimientoService.removePrestamo(createPrestamoDto.fk_usuario, createPrestamoDto.fk_material);
    const registrarHistorial: CreateHistorialDto  = {
      ...createPrestamoDto,
      fecha_de_registro: new Date(Date.now()),
      tipo_de_movimiento: "devolucion"
    };
    this.historialService.createHistorial(registrarHistorial)
    return respuestaDevolucion;
  }

  @Get("/historial")
  findAllHistorial() {
    return this.historialService.findHistorial();  
  }

}
