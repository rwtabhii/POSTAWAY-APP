import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userSchema } from "./users.schema.js";
const userModel = new mongoose.model("user", userSchema);

export class UserRepository {
    async userRegister(userData) {
        try {
            console.log(userData);
            const { name, email, mobile, age,gender,avatar, password } = userData;
            const user = new userModel({ name, email, mobile, age, gender,avatar,password });
            await user.save();
            return { success: true, res: user };
        } catch (err) {
            // console.log(err);
            // if (err instanceof mongoose.Error.ValidationError) {
            //     const message = Object.values(err.errors).map(e => e.message);
            return {
                success: false,
                error: {
                    msg: err.message,
                    statusCode: 400,
                },
            };
        }

        //     if (err.code === 11000) {
        //         return {
        //             success: false,
        //             error: {
        //                 msg: "Email or mobile already exists",
        //                 statusCode: 400,
        //             },
        //         };
        //     }

        //     return {
        //         success: false,
        //         error: {
        //             msg: "Database Error",
        //             statusCode: 500,
        //         },
        //     };
        // }
    }

    async login(userData) {
        try {
            const { email, password } = userData;
            const user = await userModel.findOne({ email });

            if (!user) {
                return {
                    success: false,
                    error: {
                        msg: "Incorrect Credentials",
                        statusCode: 400,
                    },
                };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    success: false,
                    error: {
                        msg: "Incorrect Credentials",
                        statusCode: 400,
                    },
                };
            }

            return {
                success: true,
                res: user,
                statusCode: 200,
            };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                error: {
                    msg: "Internal Server Error",
                    statusCode: 500,
                },
            };
        }
    }

    async updatePassword(userId, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true }
            );

            return {
                success: true,
                res: updatedUser,
            };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                error: {
                    msg: "Unable to update password",
                    statusCode: 400,
                },
            };
        }
    }



    // UserProfileCreation

    async updateUserProfile(userData, userId,image) {
        try {
            const user = await userModel.findById(userId).select("-password");
            if (!user) {
                return {
                    success: false,
                    error: {
                        msg: "Invlaid User Id",
                        statusCode: 400
                    }
                }
            }
            if (userData.name !== undefined) user.name = userData.name;
            if (userData.gender !== undefined) user.gender = userData.gender;
            if (image !== undefined) user.avatar = image;

            await user.save();
            return {
                success: true,
                res : user
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async getUserData(userId) {
        try {
            const user = await userModel.findById(userId).select("-password");
            if (!user) {
                return {
                    success: false,
                    error: {
                        msg: "Invlaid User Id",
                        statusCode: 400
                    }
                }
            }
            return {
                success: true,
                res: user
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async getAllUserData() {
        try {
            const getAllData = await userModel.find().select("-password");
            return getAllData;
        }catch(err){
            console.log(err)
        }
    }
}


