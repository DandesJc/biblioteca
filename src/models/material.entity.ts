import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Material {

    @PrimaryColumn()
    identificador: string
    
    @Column()
    titulo: string

    @Column()
    fecha_de_regitro: Date

    @Column()
    cantidad_registrada: number

    @Column()
    cantidad_actual: number
}
