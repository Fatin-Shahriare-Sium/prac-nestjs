import { Controller, Get, Param } from "@nestjs/common";
import { post } from "./post.interface";
import { postsService } from "./posts.service";

@Controller('posts')
export class postsController {
    constructor(private postsService: postsService) { }

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