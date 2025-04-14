import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePrestamoDto {    

    @IsNotEmpty()
    @IsString()
    fk_material: string

    @IsNotEmpty()
    @IsString()
    fk_usuario: string


    //@IsNotEmpty()
    //@IsString()
    //fecha_de_registro: Date

    
}
