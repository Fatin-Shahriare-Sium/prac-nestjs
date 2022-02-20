import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { ClientModule } from '../client/client.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [AdminModule, ClientModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
