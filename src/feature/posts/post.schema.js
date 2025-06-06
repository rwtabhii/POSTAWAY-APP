import mongoose from "mongoose";


 export const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    content: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["public", "draft", "archived"],
        default: "public"
    },
    image: {
        type: String, // store filename or image URL
        default : ""
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
},
 {
    timestamps: true
});
