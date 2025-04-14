import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialService } from 'src/controllers/movimiento/historial.services';
import { MovimientoController } from 'src/controllers/movimiento/movimiento.controller';
import { MovimientoService } from 'src/controllers/movimiento/movimiento.service';
import { Historial } from 'src/models/historial.entity';
import { Prestamo } from 'src/models/prestamo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Historial, Prestamo]),
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService, HistorialService],
  exports: [TypeOrmModule]
})
export class MovimientoModule {}
