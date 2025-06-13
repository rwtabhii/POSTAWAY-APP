import mongoose from "mongoose";

export const resetpassSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    expiresAt : {
        type : Date,
        required : true
    },
    isVerify : {
        type : Boolean,
        default : false
    }

});