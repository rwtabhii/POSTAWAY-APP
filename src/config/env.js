import dotenv from "dotenv";

dotenv.config();

 export const env ={
    Db : process.env.MONGODB_URL,
    jwtSecret : process.env.JWT_TOKEN,
    port : process.env.PORT,
    user: process.env.EMAIL_USER,
    pass : process.env.EMAIL_PASS
}