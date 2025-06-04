import express from "express";
import { likeController } from "./like.controller.js";
import jwtAuth from "../../middleware/jwttoken.js";



const likeRouter = express.Router();
const likecontroller = new likeController()


likeRouter.get("/",jwtAuth,(req,res,next)=>{
    likecontroller.getPostLikes(req,res,next);
});
likeRouter.post("/toggle/:id",jwtAuth,(req,res,next)=>{
    likecontroller.togglePostLike(req,res,next);
});


export default likeRouter;