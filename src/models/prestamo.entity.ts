import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "./material.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class Prestamo {

    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(() => Material)
    fk_material: string
    
    @ManyToOne(() => Usuario)
    fk_usuario: string

}
