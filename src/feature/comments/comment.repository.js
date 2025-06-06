import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { postModel } from "../posts/post.respository.js";


const commentModel = new mongoose.model("comment", commentSchema);


export class commentRepository {
    async getPostComment(id) {
        try {
            const findPostComment = await commentModel.find({ postId: id });
            if (findPostComment) {
                return {
                    success: true,
                    res: findPostComment
                }
            }
            return {
                success: false,
                error: {
                    msg: "No Comment found in this Post",
                    statusCode: 404
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async addPostComment(userId, postId, content) {
        try {
            const findPost = await postModel.findById(postId);
            if (findPost) {
                const createComment = await commentModel.insertOne({ userId, postId, content });
                const commentInPostAdd = await postModel.findByIdAndUpdate(postId, {
                    $addToSet: {
                        comments: createComment._id
                    }
                })
                return {
                    success: true,
                    msg: "Comment Add Successfully"
                }
            }
            return {
                success: false,
                error: {
                    msg: "Post Not Found",
                    statusCode: 404
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async deletePostComment(commentId, userId) {
        try {
            const comment = await commentModel.findById(commentId);
            const post = await postModel.findById(comment.postId);
            if (!comment) {
                return {
                    success: false,
                    error: { msg: "Comment not found", statusCode: 404 }
                };
            }

            if (comment.userId.toString() === userId) {
                const dltFormPost = await postModel.findByIdAndUpdate(post._id, {
                    $pull: {
                        comments: commentId
                    }
                })
                await commentModel.deleteOne({ _id: commentId });

                return { success: true, res: "Comment deleted by author" };
            }
            
            if (post && post.userId.toString() === userId) {
                const dltFormPost = await postModel.findByIdAndUpdate(post._id, {
                    $pull: {
                        comments: commentId
                    }
                })
                await commentModel.deleteOne({ _id: commentId });

                return { success: true, res: "Comment deleted by post owner" };
            }



            return {
                success: false,
                error: { msg: "Not authorized to delete this comment", statusCode: 400 }
            };
        } catch (err) {
            console.log(err);
        }
    }
    async updatePostComment(id, userId, content) {
        try {
            const comment = await commentModel.findByIdAndUpdate(
                { _id: id, userId },
                { content }
            );
            if (!comment) {
                return {
                    success: false,
                    error: {
                        msg: "Comment not found or not authorized",
                        statusCode: 404,
                    },
                };
            }

            return {
                success: true,
                res: "Comment update successfully"
            };
        } catch (err) {
            console.error(err);

        }
    }
}