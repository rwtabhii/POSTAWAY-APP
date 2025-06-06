
import mongoose from "mongoose";

 export const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    content : {
        type : "string",
        required : true
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }]

});