import mongoose from "mongoose";
import { createTransport } from "nodemailer";
import { resetpassSchema } from "./resetpass.schema.js";
import { userModel } from "../users/users.repository.js";
import bcrypt from "bcrypt";
import { mailSend } from "../../middleware/mailSend.js";



const resetpassModel = new mongoose.model("resetpass", resetpassSchema);


export class resetpassRepo {

    async sendOtp(email) {
        // check email is exist or not 
        try {
            const user = await userModel.findOne({ email });
            if (!user) return { success: false, msg: "User not found", statusCode: 404 };
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(otp)
            const hashedOtp = await bcrypt.hash(otp, 10);
            console.log(hashedOtp)
            // check if user already generate the otp then delete the old one and add new one 
            const checkEmailExist = await resetpassModel.deleteMany({ email });
            console.log(checkEmailExist)
             const data =  await resetpassModel.create({ email, otp: hashedOtp, expiresAt: Date.now() + 5 * 60 * 1000 });
             console.log(data)
            // const transporter = nodemailer.createTransport({
            //     service: "google",
            //     auth: {
            //         user: env.user,
            //         pass: env.pass
            //     }
            // });
            // await transporter.sendMail({
            //     from: "your@gmail.com",
            //     to: email,
            //     subject: "OTP for Password Reset",
            //     text: `Your OTP is ${otp}`
            // });
           await mailSend(email,otp);
            return { success: true, msg: "OTP sent" };
        }
        catch (err) {
            console.log(err)
        }
    }
    async verifyOtp(email, otp) {
        try {
            const record = await resetpassModel.findOne({ email });
            // console.log(record);
            if (!record) return { success: false, msg: "OTP not found", statusCode: 404 };

            const valid = await bcrypt.compare(otp, record.otp);
            if (!valid || record.expiresAt < Date.now()) {
                return { success: false, msg: "Invalid or expired OTP", statusCode: 400 };
            }
            await resetpassModel.updateOne({ email }, { isVerify: true });
            return { success: true, msg: "OTP verified", statusCode: 200 };
        }
        catch (err) {
            console.log(err);
        }
    }
    async resetPassword(email, newPassword) {
        const record = await resetpassModel.findOne({ email });

        if (!record || !record.isVerify) {
            return { success: false, msg: "OTP not verified", statusCode: 403 };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await userModel.findOneAndUpdate({ email }, { password: hashedPassword });
        await resetpassModel.deleteOne({ email });

        return { success: true, msg: "Password reset successfully", statusCode: 200 };
    }
}
