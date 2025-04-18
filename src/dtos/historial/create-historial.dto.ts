import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateHistorialDto {
   
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    fk_material: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fk_usuario: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tipo_de_movimiento:string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    fecha_de_registro: Date
}
