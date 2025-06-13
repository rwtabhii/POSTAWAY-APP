import { env } from "../config/env.js";

import nodemailer from "nodemailer";

export const mailSend = async (email,otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: env.user,
            pass: env.pass
        }
    });

    await transporter.sendMail({
        from: env.user,
        to: email,
        subject: "OTP for Password Reset",
        text: `Your OTP is ${otp}`
    });
}