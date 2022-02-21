import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { post } from '../posts/post.interface';
import { dasboardLoginStatus } from './dasboard.interface';
import { DashboardDtoLogin } from './dashboard.dto';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dasboardService: DashboardService) { }
    @Post('/login')
    //valid pass
    // curl -X POST -H "Content-Type:application/json" -d '{"email":"sium1206@gmail.com","password":"#allah"}' http://localhost:5500/dashboard/login
    //invalid pass
    // curl -X POST -H "Content-Type:application/json" -d '{"email":"sium1206@gmail.com","password":"#653####@@#$Q%2"}' http://localhost:5500/dashboard/login
    async dasboardLogin(@Body() body: DashboardDtoLogin): Promise<dasboardLoginStatus> {
        return this.dasboardService.loginDashboard(body.email, body.password)
    }

    @Get('/allPosts')
    @UseGuards(AuthGuard('jwt'))
    //token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwiaWF0IjoxNjQ1NDIwMDE0LCJleHAiOjYwMDAwMTY0NTQyMDAxNH0.w34qA2v-x9r9mwIFQ325K23l1Bevpl3ax8zYr74JWgY
    //curl http://localhost:5500/dashboard/allPosts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwiaWF0IjoxNjQ1NDIwMDE0LCJleHAiOjYwMDAwMTY0NTQyMDAxNH0.w34qA2v-x9r9mwIFQ325K23l1Bevpl3ax8zYr74JWgY"
    async getAllposts(@Req() request: Request): Promise<post[]> {
        console.log('body con', request.user);

        return this.dasboardService.getAllPosts()
    }

}
