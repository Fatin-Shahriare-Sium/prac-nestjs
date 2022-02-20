import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { postsModule } from './posts/posts.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://adminx:7m7YnJ6looCJIFP5@taskmanager.xxfr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }), TodosModule, ProductsModule, postsModule, AdminModule, AuthModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
//mongodb+srv://adminx:7m7YnJ6looCJIFP5@taskmanager.xxfr5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
export class AppModule { }
