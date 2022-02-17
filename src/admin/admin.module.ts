import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from './admin.model';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Admin', schema: adminSchema }])],
  providers: [AdminService],
  exports: [AdminService]
})

export class AdminModule { }
