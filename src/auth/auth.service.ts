import { Injectable } from '@nestjs/common';
import { adminStatus, changePasswordStatus } from '../admin/admin.interface';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService) { }

    async createAdmin(name: string, email: string, password: string): Promise<adminStatus> {
        return this.adminService.createAdmin(name, email, password)
    }
    async loginAdmin(email: string, password: any): Promise<adminStatus> {
        return this.adminService.loginAdmin(email, password)
    }
    async findAdmin(id: string) {
        return this.adminService.findAdmin(id)
    }
    async deleteAdmin(id: string) {
        return this.adminService.deleteAdmin(id)
    }
    async changePass(id: string, oldPassword: any, password: any): Promise<changePasswordStatus> {
        return this.adminService.changePassword(id, oldPassword, password)
    }

}
