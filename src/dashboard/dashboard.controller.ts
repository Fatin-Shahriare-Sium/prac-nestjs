import { Body, Controller, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private dasboardService: DashboardService) { }
    @Post('/login')
    async dasboardLogin(@Body() body: any) {
        return this.dasboardService.loginDashboard(body.email, body.password)
    }
}
