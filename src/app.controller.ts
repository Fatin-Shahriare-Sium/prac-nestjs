import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './dashboard/guards/role.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  };
  @Get('/creator')
  getMyCreator() {
    return 'Allah is not only my creator but also all the universe.'
  }

}
