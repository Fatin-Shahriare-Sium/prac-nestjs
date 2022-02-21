import { IsNotEmpty, IsString } from "class-validator"

export class DashboardDtoLogin {
    @IsString()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: any
}