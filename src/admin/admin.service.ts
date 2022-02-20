import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
let bcrypt = require('bcryptjs')
import { Model } from 'mongoose';
import { admin, adminStatus, changePasswordStatus } from './admin.interface';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private adminModel: Model<any>,
        private jwtService: JwtService
    ) { }

    async createAdmin(name: string, email: string, password: string): Promise<adminStatus> {
        let alreadyEmail = await this.adminModel.find({ email })

        if (alreadyEmail.length > 0) return { msg: 'Already created account with this email', success: false }

        let hashedPass = await bcrypt.hash(password, 9)
        let adminx = await this.adminModel.create({ name, email, password: hashedPass })
        let payloadx = {
            id: adminx._id,
            email,
            name
        }
        let encoded = await this.jwtService.sign(payloadx)
        console.log(encoded);

        return {
            id: adminx._id,
            email: adminx.email,
            msg: 'successfully,created admin account',
            success: true,
            token: encoded
        }
    }
    async findAdmin(id: string): Promise<admin> {
        let adminx = await this.adminModel.findById(id)
        return adminx
    }

    async loginAdmin(email: string, password: any): Promise<adminStatus> {
        let adminx = await this.adminModel.findOne({ email })
        let isMatch = await bcrypt.compare(password, adminx.password)
        if (!isMatch) {
            return { msg: "Invalid cradentials", success: false }
        }

        let payloadx = {
            id: adminx._id,
            email,
            name: adminx.name
        }

        let token = await this.jwtService.sign(payloadx)

        return {
            id: adminx._id,
            email,
            msg: 'Successfully,logged in',
            success: true,
            token
        }

    }



    async changePassword(id: string, oldPassword: any, password: any): Promise<changePasswordStatus> {
        let adminx = await this.adminModel.findOne({ _id: id })
        let isMatchPass = await bcrypt.compare(oldPassword, adminx.password)
        if (!isMatchPass) {
            return { msg: "Your old password does't match ", success: false }
        }
        let hashedPass = await bcrypt.hash(password, 9)
        await this.adminModel.findOneAndUpdate({ _id: id }, { $set: { password: hashedPass } })

        return {
            msg: "Successfully,updated your password",
            success: true
        }
    }
    async deleteAdmin(id: string) {
        let adminx = await this.adminModel.deleteOne({ _id: id })
        return adminx
    }
}
