import express from "express"
import { postController } from "./post.controller.js";
import jwtAuth from "../../middleware/jwttoken.js";
import uploadFile from "../../middleware/fileUploadmiddleware.js";
const postcontroller = new postController()

const postRouter = express.Router()

postRouter.get("/", jwtAuth, (req, res, next) => {
    postcontroller.getAllPosts(req, res, next)
});
postRouter.get("/user", jwtAuth, (req, res, next) => {
    postcontroller.getUserPosts(req, res, next)
});
postRouter.get("/draft", jwtAuth, (req, res, next) => {
    postcontroller.getDraftPosts(req, res, next)
});
postRouter.get("/archived", jwtAuth, (req, res, next) => {
    postcontroller.getArchivedPosts(req, res, next)
});

postRouter.get("/:id",jwtAuth, (req, res, next) => {
    postcontroller.getOnePost(req, res, next)
});
postRouter.post("/add", jwtAuth, uploadFile.single("image"), (req, res, next) => {
    postcontroller.addPost(req, res, next)
});
postRouter.patch("/:id", jwtAuth, uploadFile.single("image"), (req, res, next) => {
    postcontroller.updatePost(req, res, next)
});
postRouter.delete("/:id", jwtAuth, (req, res, next) => {
    postcontroller.deletePost(req, res, next)
});









export default postRouter;