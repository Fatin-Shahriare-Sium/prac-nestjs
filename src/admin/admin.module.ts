import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from './admin.model';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Admin', schema: adminSchema }]),
  JwtModule.register({
    secret: "#ALLAHISALMIGHTY",
    signOptions: { expiresIn: '600000000000000s' },
  })],
  providers: [AdminService],
  exports: [AdminService, MongooseModule]
})

export class AdminModule { }
