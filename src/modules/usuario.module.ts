import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from "src/controllers/usuario/usuario.service";
import { UsuarioController } from 'src/controllers/usuario/usuario.controller';
import { Roles } from 'src/models/roles.entity';
import { Usuario } from 'src/models/usuario.entity';
import { MovimientoService } from 'src/controllers/movimiento/movimiento.service';
import { HistorialService } from 'src/controllers/movimiento/historial.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Roles]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [TypeOrmModule]
})
export class UsuarioModule {}
