import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { postSchema } from "./post.model";
import { postsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Post', schema: postSchema }])],
    controllers: [postsController],
    providers: [PostsService],
    exports: [PostsService]
})

export class PostsModule { }
