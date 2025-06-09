import { friendshipRepository } from "./friendship.repository.js";
import { applicationError } from "../../middleware/errorhandling.js";

export class friendshipController {
    constructor() {
        this.friendshiprepo = new friendshipRepository();
    }
    async getUserFriends(req, res, next) {
        try {
            const userid = req.userid;
            const { status } = req.params;
            const getAllfriends = await this.friendshiprepo.getUserFriends(userid, status);
            console.log(getAllfriends)
            return res.status(200).send(getAllfriends.res);
        }
        catch (err) {
            console.log(err);
            next(err);
        }

    }
    async sendingReq(req, res, next) {
        try {
            const userid = req.userid;
            // recieverid as id
            const { id } = req.params;
            const reqSend = await this.friendshiprepo.sendingReq(userid, id);
            return res.status(201).send(reqSend.res);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getPendingReq(req, res, next) {
        try {
            const userid = req.userid;
            const pendingReq = await this.friendshiprepo.getPendingReq(userid);
            if (pendingReq.success == true) {
                return res.status(200).send(pendingReq.res)
            }

        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
    async AccOrRejReq(req, res, next) {
        try {
            const userid = req.userid
            const { reqid, status } = req.body;
            const toggleReq = await this.friendshiprepo.AccOrRejReq(reqid, status, userid);
            // console.log(toggleReq);
            if (toggleReq.success == true) {
                return res.status(200).send(toggleReq.res);
            }
            else {
                throw new applicationError(toggleReq.error.msg, toggleReq.error.statusCode);
            }
        }
        catch (err) {
            console.log(err)
            next(err);
        }
    }



}
