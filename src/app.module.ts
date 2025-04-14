import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { MaterialesController } from './controllers/materiales/materiales.controller';
import { UsuarioService } from './controllers/usuario/usuario.service';
import { Roles } from './models/roles.entity';
import { Usuario } from './models/usuario.entity';
import { Material } from './models/material.entity';
import { Prestamo } from './models/prestamo.entity';
import { Historial } from './models/historial.entity';
import { MaterialesService } from './controllers/materiales/materiales.service';
import { MaterialModule } from './modules/material.module';
import { MovimientoModule } from './modules/movimiento.module';
import { MovimientoService } from './controllers/movimiento/movimiento.service';
import { HistorialService } from './controllers/movimiento/historial.services';
import { MovimientoController } from './controllers/movimiento/movimiento.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT!),
      password: process.env.POSTGRES_PASSWORD!,
      username: process.env.POSTGRES_USER,
      entities: [Roles, Usuario, Material, Prestamo, Historial],
      //entities: [__dirname + 'src/models/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true, //Desactivar
      logging: true,
    }),
    UsuarioModule,
    MaterialModule,
    MovimientoModule

  ],
  controllers: [AppController,UsuarioController, MaterialesController, MovimientoController],/// 
  providers: [AppService, UsuarioService, MaterialesService, MovimientoService, HistorialService], //, 
})
export class AppModule {}
