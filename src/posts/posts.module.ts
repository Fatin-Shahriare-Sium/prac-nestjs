import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { postSchema } from "./post.model";
import { postsController } from "./posts.controller";
import { postsService } from "./posts.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: postSchema }])],
    controllers: [postsController],
    providers: [postsService]
})

export class postsModule { }
