import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likeable : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "type"
    },
    type : {
        type: String,
       enum :["post","comment"]
    }

}, {
    timestamps: true
})