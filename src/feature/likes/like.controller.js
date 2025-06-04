import { likeRepository } from "./like.repository.js";
import { applicationError } from "../../middleware/errorhandling.js";
const likerepository = new likeRepository()
export class likeController {

    async getPostLikes(req, res, next) {
        try {
            // console.log(req.query.type)
            const id = req.query.id;
            const type = req.query.type;
            console.log(type)

            const allLikes = await likerepository.getPostLikes(id, type)
            if (allLikes.success == true) {
                return res.status(200).send(allLikes.res);
            } else {
                throw new applicationError("No like found in that Post", 404);
            }
        } catch (err) {
            next(err);
        }
    }
    async togglePostLike(req, res, next) {
        try {
            const userid = req.userid;
            const { id } = req.params;
            const likePost = await likerepository.togglePostLike(id, userid);

            if (likePost.success == true) {
                return res.status(201).send(likePost.res.msg);
            } else {
                return res.status(404).send("Post is not Found");
            }
        } catch (err) {
            next(err);
        }
    }


}