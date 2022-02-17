import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAdminDto {
    @IsNotEmpty()
    name: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: any
}