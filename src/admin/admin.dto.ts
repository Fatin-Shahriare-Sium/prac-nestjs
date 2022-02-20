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

export class LoginAdminDto{
    @IsEmail()
    email:string
    @IsNotEmpty()
    password:any
} 

