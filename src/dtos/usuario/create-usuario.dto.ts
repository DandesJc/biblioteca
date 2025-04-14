import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @IsString()
    cedula: string;
    
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsNumber()
    rol: string
}
