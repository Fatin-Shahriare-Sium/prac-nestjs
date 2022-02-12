import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class productDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsNumber()
    price: number
}