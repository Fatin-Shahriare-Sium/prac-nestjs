import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '../admin/admin.module';
import { ClientModule } from '../client/client.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { PostsModule } from '../posts/posts.module'
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [AdminModule, ClientModule, PostsModule, PassportModule, JwtModule.register({
    secret: "#ALLAHISALMIGHTY",
    signOptions: { expiresIn: '600000000000000s' },
  })],
  controllers: [DashboardController],
  providers: [DashboardService, JwtStrategy]
})
export class DashboardModule { }
