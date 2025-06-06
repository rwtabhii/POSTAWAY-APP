import { applicationError } from "../../middleware/errorhandling.js";
import { commentRepository } from "./comment.repository.js";


export class commentController {
    constructor() {
        this.commentrepo = new commentRepository();
    }

    async getComment(req, res, next) {
        try {
            const { postid } = req.params;
            const result = await this.commentrepo.getPostComment(postid);
            if (result.success == false) {
                throw new applicationError(result.success.msg, result.success.statusCode);
            }
            res.status(200).send(result.res);
        } catch (err) {
            next(err);
        }
    }

    async addComment(req, res, next) {
        try {
            //   console.log(req.userid);
            const userid = req.userid
            console.log(req.body)
            const { postid, content } = req.body;
            
            const newComment = await this.commentrepo.addPostComment(userid, postid, content);
            if (newComment.success == true) {
              return  res.status(201).send(newComment.msg);
            }
            throw new applicationError(newComment.error.msg, newComment.error.statusCode);
        } catch (err) {
            next(err);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const userid = req.userid;
            const { id } = req.params;
            const result = await this.commentrepo.deletePostComment(id,userid );
            if (result.success == false) {
                throw new applicationError
                    (result.error.msg,result.error.statusCode);
            }
            res.status(200).send(result.res);
        } catch (err) {
            next(err);
        }
    }

    async updateComment(req, res, next) {
        try {
            const userid = req.userid;
            const { id } = req.params;
            const { content } = req.body;
            const updatedComment = await this.commentrepo.updatePostComment(id,userid, content);
            if (updatedComment.success == false) {
                throw new applicationError(updatedComment.error.msg,updatedComment.error.statusCode);
            }
            res.status(200).send(updatedComment.res);
        } catch (err) {
            next(err);
        }
    }
}