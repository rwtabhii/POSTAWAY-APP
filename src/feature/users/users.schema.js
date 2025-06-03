import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({

    name: { type: String, required: [true, "name is required"], minlength: 3 },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Enter Valid Email"]
    },
    mobile: {
        type: Number,
        unique: true,
        required: [true, "mobile is required"]
    },
    age: {
        type: Number,
        required: [true, "age is required"],
        min: [18, "Enter the  above value"],
        max: [100, "Enter the age below this"]
    },
    gender: {
        type: String,
        default : "",
        enum: ["male", "female", "other",""]
    },
    avatar: {
        type: String,
        default : ""
        // we are not using the validation becoz we are storing and validation the image using the multer``
        // validate: {
        //     validator: function (v) {
        //         return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
        //     },
        //     message: "Invalid Image URL"
        // }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        // validate: {
        //     validator: function (value) {
        //         console.log(value)
        //         return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
        //             .test(value)
        //     }
        // message: "Password should be in  8-12 character & having a special character"
        //}
    },
});  
// })import mongoose from "mongoose";Add commentMore actions

// export const userSchema = new mongoose.Schema({

//     name: { type: String, required: [true, "name is required"], minlength: 3 },
//     email: {
//         type: String,
//         unique: true,
//         required: [true, "email is required"],
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Enter Valid Email"]
//     },
//     mobile: {
//         type: Number,
//         unique: true,
//         required: [true, "mobile is required"]
//     },
//     age: {
//         type: Number,
//         required: [true, "age is required"],
//         min: [18, "Enter the  above value"],
//         max: [100, "Enter the age below this"]
//     },
//     gender: {
//         type: String,
//         default : "",
//         enum: ["male", "female", "other",""]
//     },
//     avatar: {
//         type: String,
//         default : ""
//         // we are not using the validation becoz we are storing and validation the image using the multer``
//         // validate: {
//         //     validator: function (v) {
//         //         return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v);
//         //     },
//         //     message: "Invalid Image URL"
//         // }
//     },
//     password: {
//         type: String,
//         required: [true, "password is required"],
//         // validate: {
//         //     validator: function (value) {
//         //         console.log(value)
//         //         return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
//         //             .test(value)
//         //     }
//         // message: "Password should be in  8-12 character & having a special character"
//         //}
//     },
// })