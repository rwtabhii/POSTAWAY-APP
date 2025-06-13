import express from "express";
import jwtAuth from "../../middleware/jwttoken.js";

import { resetpassController } from "./resetpass.controller.js";


 const resetpassRouter = express.Router();
const resetpasscontroller = new resetpassController();


resetpassRouter.post("/send",jwtAuth, (req, res, next) => {
    resetpasscontroller.sendOtp(req, res, next);
});
resetpassRouter.post("/verify",jwtAuth, (req, res, next) => {
    resetpasscontroller.verifyOtp(req, res, next);
});
resetpassRouter.post("/reset-password",jwtAuth, (req, res, next) => {
    resetpasscontroller.resetPass(req, res, next);
});


export default  resetpassRouter;