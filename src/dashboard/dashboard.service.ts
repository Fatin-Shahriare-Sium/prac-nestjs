import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        private jwtService: JwtService
    ) { }
    
    async loginDashboard(email: string, password: string) {
        let inAdmin = await this.adminModel.findOne({ email })
        let inClient = await this.clientModel.findOne({ email })
        if (!inAdmin && !inClient) {
            return {
                msg: "Unauthorized,you are not in role",
                success: false
            }

        }
        if (inAdmin) {
            let isMatch = await bcrypt.compare(password, inAdmin.password)
            if (!isMatch) return { msg: "invalid credentials", success: false }

            let payloadx = {
                id: inAdmin._id,
                email
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
                email
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
}
