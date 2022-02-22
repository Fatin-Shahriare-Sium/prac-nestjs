import { Body, Controller, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { adminStatus, changePasswordStatus } from '../admin/admin.interface';
import { CreateAdminDto, LoginAdminDto } from '../admin/admin.dto';
import { AuthService } from './auth.service';
import { CreateClientDto, LoginClientDto } from '../client/client.dto';
import { clientStatus } from '../client/client.interface';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/admin/create')
    //curl -X POST -H "Content-Type:application/json" -d '{"name":"sium","password:123","email":"sium1206@gmail.com"}' http://localhost:5500/auth/admin/create
    //curl -X POST -H "Content-Type:application/json" -d '{"name":"sium","password":"123","email":"sium1206@gmail.com"}' http://localhost:5500/auth/admin/create
    @UsePipes(new ValidationPipe())
    async createAdmin(@Body() body: CreateAdminDto): Promise<adminStatus> {
        let { name, password, email } = body
        return this.authService.createAdmin(name, email, password)
    }
    @Post('/admin/login')
    // curl -X POST -H "Content-Type:application/json" -d '{"email":"sium1206@gmail.com","password":"#allah"}' http://localhost:5500/auth/admin/login
    @UsePipes(new ValidationPipe())
    async loginAdmin(@Body() body: LoginAdminDto): Promise<adminStatus> {
        return this.authService.loginAdmin(body.email, body.password)
    }
    @Get('/admin/find/:id')
    async findAdmin(@Param('id') id: string) {
        //id-620deda047585faa83fba515
        console.log(id);

        return this.authService.findAdmin(id)
    }
    @Post('/admin/change-password')
    //curl -X POST -H "Content-Type:application/json" -d '{"id":"620deda047585faa83fba515","oldPassword":"#allahisalmighty","password":"#allah"}' http://localhost:5500/auth/admin/change-password
    async adminChangePassword(@Body('id') id: string, @Body('oldPassword') oldPassword: any, @Body('password') password: any): Promise<changePasswordStatus> {
        //console.log(oldPassword, password);
        return this.authService.changePass(id, oldPassword, password)
    }

    //client part

    @Post('/client/create')
    // curl -X POST -H "Content-Type:application/json" -d '{"name":"sium","password":"123","email":"sium1207@gmail.com"}' http://localhost:5500/auth/client/create
    @UsePipes(new ValidationPipe())
    async createClient(@Body() body: CreateClientDto): Promise<clientStatus> {
        console.log(body);
        return this.authService.createClient(body.name, body.email, body.password)
    }
    @Post('/client/login')
    //curl -X POST -H "Content-Type:application/json" -d '{"email":"sium1206@gmail.com","password":"#allah"}' http://localhost:5500/auth/client/login
    async clientLogin(@Body() body: LoginClientDto): Promise<clientStatus> {
        return this.authService.clientLogin(body.email, body.password)
    }
    @Post('/client/change-password')
    //curl -X POST -H "Content-Type:application/json" -d '{"password":"sium","oldPassword":"123rrr","email":"sium1206@gmail.com"}' http://localhost:5500/auth/client/change-password
    async changeClientPassword(@Body() body: any): Promise<changePasswordStatus> {
        return this.authService.changeClientPassword(body.email, body.oldPassword, body.password)
    }
}


