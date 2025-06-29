import  {env} from  "./src/config/env.js";
import express from "express";
import jwtAuth from "./src/middleware/jwttoken.js";
import userRouter from "./src/feature/users/users.route.js"
import postRouter from "./src/feature/posts/post.route.js"
import likeRouter from "./src/feature/likes/like.route.js";
 import commentRouter from "./src/feature/comments/comment.route.js";
import { applicationError } from "./src/middleware/errorhandling.js"
 //import bookmarkRoute from "./src/feature/bookmarks/bookmark.route.js";
 import friendshipRoute from "./src/feature/friendships/friendship.route.js";
 import resetpassRouter from "./src/feature/resetpassword/resetpass.route.js";

import loggerMiddleware from "./src/utils/logger.middleware.js"
import { createDbConnection } from "./src/config/mongodb.config.js";
import cookieParser from "cookie-parser";
import swagger from "swagger-ui-express";
import fs from "fs";


const server = express();
server.use(express.json())
server.use(loggerMiddleware);
server.use(cookieParser());
// swagger docs
const swaggerDocs = JSON.parse(fs.readFileSync("./src/docs/swagger.json","utf-8"))
server.use("/apidocs",swagger.serve,swagger.setup(swaggerDocs))
server.use("/api/users",userRouter);
server.use("/api/posts",postRouter);
server.use("/api/likes",likeRouter);
server.use("/api/comments",commentRouter);
server.use("/api/friends",friendshipRoute)
server.use("/api/otp",resetpassRouter);
server.use((req,res)=>{
  return res.status(404).send("Api route not found");
});


// error handling  middleware
server.use((err,req,res,next)=>{
    console.log(err)
    if(err instanceof applicationError){
        return res.status(err.code).send(err.message)
    }else{
        return res.status(500).send("Internal server error");
    }
})


// console.log(env);
server.listen(env.port,()=>{
    createDbConnection();
});
console.log("server is listening");