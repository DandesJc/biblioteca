import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "./material.entity";
import { Usuario } from "./usuario.entity";

@Entity()
export class Historial {
        
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(material => Material)
    fk_material: string
    
    @ManyToOne(usuario => Usuario)
    fk_usuario: string

    @Column()
    tipo_de_movimiento: string

    @Column()
    fecha_de_registro: Date
    
}
