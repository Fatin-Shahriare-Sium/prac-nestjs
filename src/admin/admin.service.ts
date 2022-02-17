import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
let bcrypt = require('bcryptjs')
import { Model } from 'mongoose';
import { adminStatus } from './admin.interface';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Admin') private adminModel: Model<any>) { }

    async createAdmin(name: string, email: string, password: string) {
        let hashedPass = await bcrypt.hash(password, 9)
        let adminx = await this.adminModel.create({ name, email, password: hashedPass })
        return adminx
    }
    async findAdmin(id: string) {
        let adminx = await this.adminModel.findById(id)
        return adminx
    }
    async changePassword(id: string, password: any) {
        let hashedPass = await bcrypt.hash(password, 9)
        let adminx = await this.adminModel.findOneAndUpdate({ _id: id }, { $set: { password: hashedPass } })
    }
    async deleteAdmin(id: string) {
        let adminx = await this.adminModel.deleteOne({ _id: id })
        return adminx
    }
}
