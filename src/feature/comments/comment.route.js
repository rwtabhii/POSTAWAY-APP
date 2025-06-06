import express from "express";
import { commentController } from "./comment.controller.js";
import jwtAuth from "../../middleware/jwttoken.js";


const commentRouter = express.Router();
const commentcontroller = new commentController();



commentRouter.get("/:postid", jwtAuth,(req,res,next)=>{
    commentcontroller.getComment(req,res,next);
}); 
commentRouter.post("/", jwtAuth,(req,res,next)=>{
    commentcontroller.addComment(req,res,next);
});          
commentRouter.put("/:id", jwtAuth,(req,res,next)=>{
    commentcontroller.updateComment(req,res,next);
});      
commentRouter.delete("/:id",jwtAuth,(req,res,next)=>{
    commentcontroller.deleteComment(req,res,next);
});


export default commentRouter;