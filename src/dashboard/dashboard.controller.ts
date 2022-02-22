import { Body, Controller, Post, Get, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { post } from '../posts/post.interface';
import { dasboardLoginStatus } from './dasboard.interface';
import { DashboardDtoLogin } from './dashboard.dto';
import { DashboardService } from './dashboard.service';

enum Roles {
    superClient = "super client", //as like admin does
    basicClient = "basic client", //only sees post like ordinary people and edit their owns
    cleanerClient = 'cleaner client' //delete or hide harmful posts and comment

}

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
    // curl http://localhost:5500/dashboard/allUsers -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM"
    @UseGuards(AuthGuard('jwt'))
    async getAllUsers(@Req() req: any) {
        //only,admin and super client can access it
        if (req.user.role == Roles.cleanerClient) {

            return {
                msg: "You have not permissions",
                success: false
            }
        }

        return this.dasboardService.getAllUsers()
    }

    @Get('/allUsers/delete/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Param('id') id: string, @Req() req: any) {
        //only,admin and super client can access it
        if (req.user.role == Roles.cleanerClient) {
            return {
                msg: "You have not permissions",
                success: false
            }
        }
        await this.dasboardService.deleteUser(id)
    }

    @Get('/allPosts')
    @UseGuards(AuthGuard('jwt'))
    //token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM
    // curl http://localhost:5500/dashboard/allPosts -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGRlZGEwNDc1ODVmYWE4M2ZiYTUxNSIsImVtYWlsIjoic2l1bTEyMDZAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ1NDU4NjQ5LCJleHAiOjYwMDAwMTY0NTQ1ODY0OX0.Ujgw9HA_u8IPFZO9FjPml3GKtAU2JxXegNvbf6AAZGM"
    async getAllposts(@Req() request: Request): Promise<post[]> {
        console.log('body con', request.user);
        return this.dasboardService.getAllPosts()
    }

    @Get('/allposts/delete/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteOnePost(@Param('id') id: string) {
        return this.dasboardService.deletePost(id)
    }

}
