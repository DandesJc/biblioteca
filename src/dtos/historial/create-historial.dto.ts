import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateHistorialDto {
   
    @IsNotEmpty()
    @IsString()
    fk_material: string

    @IsNotEmpty()
    @IsString()
    fk_usuario: string

    @IsNotEmpty()
    @IsString()
    tipo_de_movimiento:string


    @IsNotEmpty()
    @IsDate()
    fecha_de_registro: Date
}
