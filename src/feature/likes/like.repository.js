import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { postModel } from "../posts/post.respository.js";

const likeModel = new mongoose.model("like", likeSchema);

export class likeRepository {
    async getPostLikes(postId, type) {
        try {
            // first approach 
            // const likess = await likeModel.find({ postId }).populate("user")
            //     .populate({ path: "likeable",model : type });

            // second approach 
            const post = await postModel.findById(postId);
            if (!post) {
                return {
                    success: false,
                    error: { msg: "Post not found", statusCode: 404 }
                };
            }
            const likes = await likeModel.find({ likeable: postId,type : type }, { likeable: 0,type: 0 }).populate("user");


            return {
                success: true,
                res: {
                    post,
                    "likes on Post are ": likes
                }
            };
        } catch (err) {
            console.log(err);
        }
    }
    async togglePostLike(id, userId) {
        // this is a transaction code for this db has to replication enabled 
        // check for like 
        //     try {
        //         const session = await mongoose.startSession();
        //         session.startTransaction();
        //         const checkLike = await likeModel.findOne({ user: userId, likeable: id }).session(session);
        //         if (checkLike) {
        //             const dislikePost = await likeModel.deleteOne(
        //                 { user: userId, likeable: id }).session(session);
        //             console.log("Remove the like form the Like colleciton")
        //             const removePostLike = await postModel.findByIdAndUpdate(id, {
        //                 $pull: {
        //                     likes: userId
        //                 }
        //             }, { session });
        //             console.log("update the Post Collection")
        //             session.commitTransaction();
        //             session.endSession();
        //             return {
        //                 success: true,
        //                 res: {
        //                     msg: "Dislike Post successfully",
        //                     statusCode: 201
        //                 }
        //             }
        //         }
        //         const addLike = new likeModel({
        //             user: userId,
        //             likeable: id,
        //             type: "post"
        //         })
        //         await addLike.save({ session });
        //         //    update the post as well 
        //         const updatePost = await postModel.findByIdAndUpdate(postId, { $addToSet: { likes: userId } },
        //             { session });
        //         session.commitTransaction();
        //         session.endSession();
        //         return {
        //             success: true,
        //             res: {
        //                 msg: "Like add successfully",
        //                 statusCode: 201
        //             }
        //         }

        //     }catch(err){
        //         console.log(err);
        //         session.abortSession();
        //         session.endSession();
        //     }
        //  another approach
        try {
            const checkLike = await likeModel.findOne({ user: userId, likeable: id });
            if (checkLike) {
                const dislikePost = await likeModel.deleteOne(
                    { user: userId, likeable: id });
                console.log("Remove the like form the Like colleciton")
                const removePostLike = await postModel.findByIdAndUpdate(id, {
                    $pull: {
                        likes: userId
                    }
                });
                console.log("update the Post Collection")
                return {
                    success: true,
                    res: {
                        msg: "Dislike Post successfully",
                    
                    }
                }
            }
            const addLike = new likeModel({
                user: userId,
                likeable: id,
                type: "post"
            })
            await addLike.save();
            //    update the post as well 
            const updatePost = await postModel.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
            return {
                success: true,
                res: {
                    msg: "Like add successfully",
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

}