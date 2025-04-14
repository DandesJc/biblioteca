import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMaterialDto {

    [key: string]: any
    
    @IsNotEmpty()
    @IsString()
    identificador: string

    @IsNotEmpty()
    @IsString()
    titulo: string

    @IsNotEmpty()
    @IsNumber()
    cantidad_registrada: number

    
    @IsNotEmpty()
    @IsNumber()
    cantidad_actual: number


    // @IsNotEmpty()
    // @IsDate()
    // fecha_de_regitro: Date
}
