import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { post } from '../posts/post.interface';
import { PostsService } from '../posts/posts.service';
import { dasboardLoginStatus } from './dasboard.interface';
let bcrypt = require('bcryptjs')

enum Roles {
    superClient = "super client", //as like admin does
    basicClient = "basic client", //only sees post like ordinary people and edit their owns
    cleanerClient = 'cleaner client' //delete or hide harmful posts and comment

}

@Injectable()
export class DashboardService {
    constructor(@InjectModel('Admin') private adminModel: Model<any>,
        @InjectModel('Client') private clientModel: Model<any>,
        private postsService: PostsService,
        private jwtService: JwtService
    ) { }

    async loginDashboard(email: string, password: string): Promise<dasboardLoginStatus> {
        let inAdmin = await this.adminModel.findOne({ email })
        let inClient = await this.clientModel.findOne({ email })
        //we are trying to find is RequestSender is Admin or client 
        //if we don't find,we throw unauthorized 
        if (!inAdmin && !inClient) {
            return {
                msg: "Unauthorized,you are not in role",
                success: false
            }

        }
        //if we find him as Admin
        if (inAdmin) {
            let isMatch = await bcrypt.compare(password, inAdmin.password)
            if (!isMatch) return { msg: "invalid credentials", success: false }

            let payloadx = {
                id: inAdmin._id,
                email,
                role: 'admin'
            }
            let tokenx = await this.jwtService.sign(payloadx)

            return {
                ...payloadx,
                token: tokenx,
                msg: "Successfully,login to dashboard",
                success: true
            }
        } else {
            if (inClient.role == Roles.basicClient) {
                return {
                    msg: "Unauthorized,you are not in role",
                    success: false
                }

            }

            let isMatch = await bcrypt.compare(password, inClient.password)
            if (!isMatch) return { msg: "invalid credentials", success: false }

            let payloadx = {
                id: inClient._id,
                email,
                role: inClient.role
            }
            let tokenx = await this.jwtService.sign(payloadx)

            return {
                ...payloadx,
                token: tokenx,
                msg: "Successfully,login to dashboard",
                success: true
            }

        }

    }

    async getAllPosts(): Promise<post[]> {
        return this.postsService.getAllPosts()
    }
    async deletePost(id: string) {
        return this.postsService.deleteSinglePost(id)
    }
    async getAllUsers() {
        let usersx = await this.clientModel.find()
        return usersx
    }
    async deleteUser(id: string) {
        await this.clientModel.deleteOne({ _id: id })
    }

    async changeUserRole(userId: string, role: string) {
        //console.log(role);
        //console.log('Roles[role]', Roles[role]);
        //we are trying to see is the coming role is in the enum 
        if (role in Roles) {
            console.log('role has role');
            let clientx = await this.clientModel.findOneAndUpdate({ _id: userId }, { $set: { role: Roles[role] } })
            return {
                msg: `Successfully,updated user role from ${clientx.role} to ${Roles[role]}`,
                success: true
            }
        }
        return {
            msg: 'Your role is not in options,try again',
            success: false
        }

    }
}
