import { applicationError } from "../../middleware/errorhandling.js";

import { postRepository } from "./post.respository.js";



export class postController {
    constructor() {
        this.postrepo = new postRepository();
    }

    async getAllPosts(req, res) {
        try {
            const posts = await this.postrepo.getAllPostSorted();
            return res.status(200).send(posts);
        }
        catch (err) {
            next(err);
        }
    }
    async getOnePost(req, res, next) {
        try {
            const { id } = req.params;    // PostId
            const post = await  this.postrepo.getOnePost(id,req.userid);
            if (post.success == true) {
                return res.status(200).send(post.res);
            } else {
                throw new applicationError(post.error.msg, post.error.statusCode);
            }
        } catch (err) {
            // console.log(err);
            next(err);
        }
    }
    async getUserPosts(req, res, next) {
        try {
            const {status} = req.query;
            const userid = req.userid;
            const userPosts = await  this.postrepo.getUserPost(userid,status);
            if (userPosts.success == true) {
                return res.status(200).send(userPosts.res);
            } else {
                throw new applicationError(userPosts.error.msg, userPosts.error.statusCode)
            }
        } catch (err) {
            next(err);
        }
    }
    async addPost(req, res, next) {
        try {
            const userId = req.userid;

            // console.log(userId);
        
            // console.log(req.body)
            const { content,status } = req.body;
            const image = req.file.filename;
            const addpost = await  this.postrepo.addPost(userId, status,content, image);
            if (addpost.success == true) {
                return res.status(201).send(addpost.msg);
            }
        }
        catch (err) {
            next(err);
        }
    }
    async getDraftPosts(req, res, next) {
        try {
            const userid = req.userid;
            const status = "draft";
            const draftPost = await this.postrepo.getPostsByStatus(userid,status);
            // console.log(draftPost)
             if (draftPost.success == true) {
                return res.status(200).send(draftPost.res);
            } else {
                throw new applicationError(draftPost.error.msg, draftPost.error.statusCode)
            }
        } catch (err) {
            next(err);
        }
    }

    async getArchivedPosts(req, res, next) {
         try {
            const userid = req.userid;
            const status = "archived";
            const archivedPost = await this.postrepo.getPostsByStatus(userid,status);
             if (archivedPost.success == true) {
                return res.status(200).send(archivedPost.res);
            } else {
                throw new applicationError(archivedPost.error.msg, archivedPost.error.statusCode)
            }
        } catch (err) {
            next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            const { id } = req.params;
            const userid = req.userid
            const { content, status } = req.body;
            const image = req.file ? req.file.filename : undefined;
            const findPost = await this.postrepo.updatePost(id, userid, content, image);
            if(findPost.success == true){
                return res.status(201).send(findPost.res);
            } else {
                throw new applicationError("Post not found", 404);
            }
        } catch (err) {
            next(err);
        }
    }
    async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userid;
            const findPost = await this.postrepo.deletePost(id,userId);
            if (findPost.success == true) {
                return res.status(200).send(findPost.msg);
            } else {
                throw new applicationError(findPost.error.msg,findPost.error.statusCode);
            }
        } catch (err) {
            next(err);
        }
    }

}