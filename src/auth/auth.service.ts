import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService) { }

    async createAdmin(name: string, email: string, password: string) {
        return this.adminService.createAdmin(name, email, password)
    }
    async findAdmin(id: string) {
        return this.adminService.findAdmin(id)
    }
    async deleteAdmin(id: string) {
        return this.adminService.deleteAdmin(id)
    }
    async changePass(id: string, password: any) {
        return this.adminService.changePassword(id, password)
    }

}
