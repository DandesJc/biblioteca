import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePrestamoDto {    

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fk_material: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fk_usuario: string


    //@IsNotEmpty()
    //@IsString()
    //fecha_de_registro: Date

    
}
