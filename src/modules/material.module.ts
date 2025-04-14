import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialesController } from 'src/controllers/materiales/materiales.controller';
import { MaterialesService } from 'src/controllers/materiales/materiales.service';
import { Material } from 'src/models/material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]),
  ],
  controllers: [MaterialesController],
  providers: [MaterialesService],
  exports: [TypeOrmModule]
})
export class MaterialModule {}
