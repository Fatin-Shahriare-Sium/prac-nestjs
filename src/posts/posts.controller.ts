import { Controller, Get, Param } from "@nestjs/common";
import { post } from "./post.interface";
import { PostsService } from "./posts.service";

@Controller('posts')
export class postsController {
    constructor(private postsService: PostsService) { }

    @Get()
    async getAllPost(): Promise<post[]> {
        return await this.postsService.getAllPosts()
    }
    @Get('/:id')
    async getSinglePost(@Param('id') id: string): Promise<post> {
        console.log('postids', id);
        return await this.postsService.getSinglePost(id)
    }

}