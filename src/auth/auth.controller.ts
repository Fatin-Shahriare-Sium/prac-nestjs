import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAdminDto } from '../admin/admin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/admin/create')
    //curl -X POST -H "Content-Type:application/json" -d '{"name":"sium","password:123","email":"sium1206@gmail.com"}' http://localhost:5500/auth/admin/create
    //curl -X POST -H "Content-Type:application/json" -d '{"name":"sium","password":"123","email":"sium1206@gmail.com"}' http://localhost:5500/auth/admin/create
    @UsePipes(new ValidationPipe())
    async createAdmin(@Body() body:  CreateAdminDto) {
        let { name, password, email } = body
        return this.authService.createAdmin(name, email, password)
    }
    @Get('/admin/find/:id')
    async findAdmin(@Param('id') id: string) {
        //id-620deda047585faa83fba515
        console.log(id);
        
        return this.authService.findAdmin(id)
    }
    @Post('/admin/change-password')
    async adminChangePassword(@Body() body: any) {
        return this.authService.changePass(body.id, body.password)
    }
    
}

