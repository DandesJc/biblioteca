import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./roles.entity";

@Entity()
export class Usuario {
    @PrimaryColumn()
    cedula: string;

    @Column()
    nombre: string;

    //@ManyToOne(type => Roles)
    @Column({ type: 'varchar', nullable: true })
    rol: string
}
