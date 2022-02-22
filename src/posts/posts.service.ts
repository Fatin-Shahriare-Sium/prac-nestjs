import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { json } from "express";
import { Model } from "mongoose";
import { deleteStatus, post } from "./post.interface";

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private postModel: Model<any>) { }

    async getAllPosts(): Promise<post[]> {
        let posts = await this.postModel.find()
        return posts;
    }

    async getSinglePost(id: string): Promise<post> {
        let post = await this.postModel.findById(id)
        return post
    }

    async deleteSinglePost(id: string): Promise<deleteStatus> {
        await this.postModel.deleteOne({ _id: id })
        return {
            msg: "successfully,deleted this post",
            success: true
        }
    }
}