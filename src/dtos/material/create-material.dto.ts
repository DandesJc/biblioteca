import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMaterialDto {

    [key: string]: any

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    identificador: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    titulo: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cantidad_registrada: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cantidad_actual: number


    // @IsNotEmpty()
    // @IsDate()
    // fecha_de_regitro: Date
}
