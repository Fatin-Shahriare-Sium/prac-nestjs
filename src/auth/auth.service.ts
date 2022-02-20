import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { adminStatus, changePasswordStatus } from '../admin/admin.interface';
import { AdminService } from '../admin/admin.service';
import { clientStatus } from '../client/client.interface';

@Injectable()
export class AuthService {
    constructor(private readonly adminService: AdminService,
        private readonly clientService: ClientService
    ) { }

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

    //client part

    async createClient(name: string, email: string, password: any): Promise<clientStatus> {
        return this.clientService.createClient(name, email, password)
    }

    async clientLogin(email: string, password: any): Promise<clientStatus> {
        return this.clientService.clientLogin(email, password)
    }

    async changeClientPassword(email: string, oldPassword: any, password: any): Promise<changePasswordStatus> {
        return this.clientService.changePassword(email, oldPassword, password)
    }

}
