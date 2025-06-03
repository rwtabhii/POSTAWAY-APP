import express from "express";
import { UserController } from "./users.controller.js";
import jwtAuth from "../../middleware/jwttoken.js";
import uploadFile from "../../middleware/fileUploadmiddleware.js";


const userRouter = express.Router();
const usercontroller = new UserController ();

                  //   UserAuth Routes
userRouter.post("/signup",(req,res,next)=>{
    usercontroller.register(req,res,next);
});
userRouter.post("/signin",(req,res,next)=>{
    usercontroller.signin(req,res,next);
});
userRouter.route("/logout").get(jwtAuth,(req,res,next)=>{
    usercontroller.logout(req,res,next);
})

             // UserProfile Routes
userRouter.get("/:id",jwtAuth,(req,res,next)=>{
    usercontroller.getUserData(req,res,next)
})             

userRouter.get("/",jwtAuth,(req,res,next)=>{
    usercontroller.getAllUserData(req,res,next)
})             

userRouter.post("/details/:id",jwtAuth,uploadFile.single("avatar"),(req,res,next)=>{
    usercontroller.updateUserProifle(req,res,next);
})             
export default userRouter;