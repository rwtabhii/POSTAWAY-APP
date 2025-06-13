import { applicationError } from "../../middleware/errorhandling.js";
import { resetpassRepo } from "./resetpass.repository.js";



export class resetpassController {
    constructor() {
        this.resetpassrepo = new resetpassRepo();
    }
    async sendOtp(req, res, next) {
        try {
            const { email } = req.body;
            const sendOtp = await this.resetpassrepo.sendOtp(email);
            console.log(sendOtp)
            if (sendOtp.success == true) {
                return res.status(200).send(sendOtp.msg)
            }
            throw new applicationError(sendOtp.msg, sendOtp.statusCode);
        }
        catch (err) {
            next(err);
        }

    }
    async verifyOtp(req, res, next) {
        try {
            const { email, otp } = req.body;
            const result = await this.resetpassrepo.verifyOtp(email, otp);
            console.log(result);
            if (result.success == true) { return res.status(result.statusCode).send(result.msg); }
            throw new applicationError(result.msg, result.statusCode);

        } catch (err) {
            next(err);
        }
    }
    async resetPass(req, res, next) {
        try {
            const { email, newPassword } = req.body;
            const result = await this.resetpassrepo.resetPassword(email, newPassword);
            if (result.success == true) { return res.status(result.statusCode).send(result.msg); }
            throw new applicationError(result.msg,result.statusCode);

        } catch (err) {
            next(err);
        }
    }
}

