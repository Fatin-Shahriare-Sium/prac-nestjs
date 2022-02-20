import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { changePasswordStatus, clientStatus } from './client.interface';
let bcrypt = require('bcryptjs')

enum Roles {
    superClient = "super client", //as like admin does
    basicClient = "basic client", //only sees post like ordinary people and edit their owns
    cleanerClient = 'cleaner client' //delete or hide harmful posts and comment

}

@Injectable()
export class ClientService {
    constructor(@InjectModel('Client') private clientModel: Model<any>,
        private jwtService: JwtService
    ) { }

    async createClient(name: string, email: string, password: any): Promise<clientStatus> {
        //check already created account with this email

        let isAlready = await this.clientModel.find({ email })
        if (isAlready.length > 0) {
            return {
                msg: 'Already created account with this email',
                success: false
            }
        }
        let hassedPass = await bcrypt.hash(password, 9)
        let clientx = await this.clientModel.create({ name, email, password: hassedPass, role: Roles.basicClient })
        let payloadx = {
            id: clientx._id,
            email: email
        }
        let tokenx = await this.jwtService.sign(payloadx)
        return {
            ...payloadx,
            token: tokenx,
            msg: "Successfully,created an account",
            success: true
        }
    }
    async clientLogin(email: string, password: any): Promise<clientStatus> {
        let clientx = await this.clientModel.findOne({ email })
        if (!clientx) return { msg: 'Invalid credentials', success: false }

        let isMatch = await bcrypt.compare(password, clientx.password)
        if (!isMatch) return { msg: 'Invalid credentials', success: false }
        let payloadx = {
            id: clientx._id,
            email
        }
        let tokenx = await this.jwtService.sign(payloadx)
        return {
            ...payloadx,
            token: tokenx,
            msg: 'Successfully,login to your account',
            success: true
        }

    }
    async changePassword(email: string, oldPassword: string, password: string): Promise<changePasswordStatus> {
        let clientx = await this.clientModel.findOne({ email })
        if (!clientx) return { msg: 'Invalid credentials', success: false }

        let isMatch = await bcrypt.compare(oldPassword, clientx.password)
        if (!isMatch) return { msg: 'Invalid credentials', success: false }

        let hashedPass = await bcrypt.hash(password, 7)
        await this.clientModel.findOneAndUpdate({ email }, { $set: { password: hashedPass } })

        return {
            msg: 'Successfully,updated your password',
            success: true
        }
    }
}
