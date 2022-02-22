import { Controller, Get, Param } from "@nestjs/common";
import { deleteStatus, post } from "./post.interface";
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
    @Get('/:id')
    async deletePost(@Param('id') id: string): Promise<deleteStatus> {
        return this.postsService.deleteSinglePost(id)
    }
}