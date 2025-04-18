import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cedula: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    rol: string
}
