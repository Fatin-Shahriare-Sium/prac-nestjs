import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientModule } from '../client/client.module';
import { AdminModule } from '../admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [AdminModule, ClientModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
