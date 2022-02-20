import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import clientSchema from './client.model';
import Client from './client.model';
import { ClientService } from './client.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }]),
  JwtModule.register({
    secret: "#ALLAHISALMIGHTY",
    signOptions: { expiresIn: '600000000000000s' },
  }),
  ],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule { }
