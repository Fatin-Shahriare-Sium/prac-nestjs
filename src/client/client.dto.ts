import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateClientDto {
    @IsNotEmpty()
    name: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: any
}

export class LoginClientDto {
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: any
}
