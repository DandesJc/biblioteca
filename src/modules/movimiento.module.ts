import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialService } from 'src/controllers/movimiento/historial.services';
import { MovimientoController } from 'src/controllers/movimiento/movimiento.controller';
import { MovimientoService } from 'src/controllers/movimiento/movimiento.service';
import { UsuarioService } from 'src/controllers/usuario/usuario.service';
import { Historial } from 'src/models/historial.entity';
import { Material } from 'src/models/material.entity';
import { Prestamo } from 'src/models/prestamo.entity';
import { Usuario } from 'src/models/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Historial, Prestamo, Material, Usuario]),
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService, HistorialService, UsuarioService],
  exports: [TypeOrmModule]
})
export class MovimientoModule {}
