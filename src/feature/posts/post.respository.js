import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";


 export const postModel = new mongoose.model("post", postSchema);


export class postRepository {
    async getAllPostSorted() {
        try {
            const posts = await postModel.find({ status: "public" }).sort({ createdAt: -1 });
            return {
                success: true,
                res: posts
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getOnePost(postId, userId) {
        try {
            const post = await postModel.findOne({ _id: postId, userId: userId });
            if (!post) {
                return {
                    success: false,
                    error: {
                        msg: "Post Id Not Found",
                        statusCode: 404
                    }
                }
            }
            return {
                success: true,
                res: post
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async getUserPost(userId, status) {
        try {
            const userPost = await postModel.find({ userId, status });
            if (!userPost) {
                return {
                    success: false,
                    error: {
                        msg: "Not Found",
                        statusCode: 404
                    }
                }
            }
            return {
                success: true,
                res: userPost
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async addPost(userId, status, content, image) {
        try {
            const uploadPost = new postModel({ userId, status, content, image });
            await uploadPost.save();
            return {
                success: true,
                msg: "Post Upload Successfully"
            }
        } catch (err) {
            console.log(err);
        }
    }
    async getPostsByStatus(userId, status) {
        try {
            const posts = await postModel.find({ userId, status });
            // console.log(post);

            if (!posts || posts.length === 0) {
                return {
                    success: false,
                    error: {
                        msg: "Not Found",
                        statusCode: 404
                    }
                };
            }

            return {
                success: true,
                res: posts
            };
        } catch (err) {
            console.log(err);
        }
    }
    async updatePost(id, userId, content, image) {
        try {
            const findPost = await postModel.findOne({ _id: id, userId: userId });
            if (!findPost) {
                return {
                    success: false,
                    error: { msg: "Post not found", statusCode: 404 }
                };
            }
            if (image !== undefined) findPost.image = image;
            if (content !== undefined) findPost.content = content;
            if (image !== undefined) findPost.image = image;
            console.log(findPost);

            const updatePost = await findPost.save();
            return { success: true, res: updatePost };
        }
        catch (err) {
            console.log(err);
        }
    }
    async deletePost(id, userId) {
        try {
            const deletePost = await postModel.deleteOne({ _id: id, userId: userId });
            console.log(deletePost);
            if (deletePost.deletedCount === 0) {
                return {
                    success: false,
                    error: {
                        msg: "Post not Found",
                        statusCode: 404
                    }
                };
            }
            return {
                success: true,
                msg: "Post delete Successfully"
            }

        }
        catch (err) {
            console.log(err)
        }
    }
}