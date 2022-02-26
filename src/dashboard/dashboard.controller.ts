import { Body, Controller, Post, Get, UseGuards, Req, Param, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

import { Request } from 'express';
import { post } from '../posts/post.interface';
import { dasboardLoginStatus } from './dasboard.interface';
import { DashboardDtoLogin } from './dashboard.dto';
import { DashboardService } from './dashboard.service';
import { RoleGuard } from './guards/role.guard';
import { Rolex } from './decorators/role.decorator'
enum Roles {
    superClient = "super client", //as like admin does
    basicClient = "basic client", //only sees post like ordinary people and edit their owns
    cleanerClient = 'cleaner client' //delete or hide harmful posts and comment

}

//Basic client token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTQ3Njc2NjA5YjM1OWUzZTk3OTk1MiIsImVtYWlsIjoic2l1bTEyMDdAZ21haWwuY29tIiwiaWF0IjoxNjQ1NTA4MjE0LCJleHAiOjYwMDAwMTY0NTUwODIxNH0.HPjuPOrPnx2xwaEFq1n1CA-EucEaZWka0vtlKrZG9QI


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

    @Get('/allUsers')
    //Admin
    // curl http://localhost:5500/dashboard/allUsers -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM"
    //Basic client
    //curl http://localhost:5500/dashboard/allUsers -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTQ3Njc2NjA5YjM1OWUzZTk3OTk1MiIsImVtYWlsIjoic2l1bTEyMDdAZ21haWwuY29tIiwiaWF0IjoxNjQ1NTA4MjE0LCJleHAiOjYwMDAwMTY0NTUwODIxNH0.HPjuPOrPnx2xwaEFq1n1CA-EucEaZWka0vtlKrZG9QI"
    //super client
// curl http://localhost:5500/dashboard/allUsers -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTQ3Njc2NjA5YjM1OWUzZTk3OTk1MiIsImVtYWlsIjoic2l1bTEyMDdAZ21haWwuY29tIiwicm9sZSI6InN1cGVyIGNsaWVudCIsImlhdCI6MTY0NTUxMzMyOCwiZXhwIjo2MDAwMDE2NDU1MTMzMjh9.bUBMygq_JKbKdb5Nj0XZrniRy6ST2Gfo-2so_xWUTuA"
    @Rolex('admin', Roles.superClient)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    async getAllUsers(@Req() req: any) {
        //only,admin and super client can access it
        return this.dasboardService.getAllUsers()
    }

    @Get('/allUsers/delete/:id')
    @Rolex('admin',Roles.superClient)
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    async deleteUser(@Param('id') id: string, @Req() req: any) {
        //only,admin and super client can access it
        await this.dasboardService.deleteUser(id)
    }

    @Get('/allPosts')
    @Rolex('admin',Roles.superClient,Roles.cleanerClient)
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    //token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM
    // curl http://localhost:5500/dashboard/allPosts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM"
    async getAllposts(@Req() request: Request): Promise<post[]> {
        console.log('body con', request.user);
        return this.dasboardService.getAllPosts()
    }

    @Get('/allposts/delete/:id')
    @Rolex('admin',Roles.superClient,Roles.cleanerClient)
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    async deleteOnePost(@Param('id') id: string) {
        return this.dasboardService.deletePost(id)
    }

    @Post('/allUsers/change-role')
    // curl http://localhost:5500/dashboard/allUsers -H -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM"
    // curl -X POST -H "Content-Type:application/json" -d '{"userId":"62147676609b359e3e979952","role":"basicClient"}' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM" http://localhost:5500/dashboard/allUsers/change-role
    @Rolex('admin',Roles.superClient)
    @UseGuards(AuthGuard('jwt'),RoleGuard)
    async changeUserRole(@Body('userId') userId: string, @Body('role') role: string, @Req() req: any) {
        return this.dasboardService.changeUserRole(userId, role)
    }
}
