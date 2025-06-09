import mongoose from "mongoose";

import { friendshipSchema } from "./friendship.schema.js";

const friendshipModel = new mongoose.model("friendship", friendshipSchema);

export class friendshipRepository {
    async getUserFriends(userId, status) {
        try {
            const userFriends = await friendshipModel.find({ reciever: userId, status: "accepted" });
            if (userFriends.length > 0) {
                return {
                    success: true,
                    res: userFriends
                }
            }
            return {
                success: true,

                res: "You Don't Have Any Friend",

            }

        }
        catch (err) {
            console.log(err);
        }
    }
    async sendingReq(userId, recieverId) {
        try {
            const friendReq = new friendshipModel({ sender: userId, reciever: recieverId });
            await friendReq.save();
            return {
                success: true,
                res: "Friend Req Send Successfully"
            }
        }
        catch (err) {
            console.log(err);
        }

    }
    async getPendingReq(userId, status) {
        try {
            const req = await friendshipModel.find({ reciever: userId, status: "pending" })
                .populate("sender", "name gender avatar -_id");
            if (req.length > 0) {
                return {
                    success: true,
                    res: req
                }
            }
            return {
                success: true,
                res: "No Pending Request"
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async AccOrRejReq(reqId, status, userId) {
        try {

            if (!["accepted", "rejected"].includes(status)) {
                return {
                    success: false,
                    error: {
                        msg: "Invalid status. Use 'accepted' or 'rejected'.",
                        statusCode: 400
                    }
                };
            }
            if (status == "accepted") {
                const request = await friendshipModel.findById(reqId);
                if (!request) {
                    return {
                        success: false,
                        error: { msg: "Friend request not found", statusCode: 404 }
                    };
                }
                if (request.reciever.toString() !== userId) {
                    return {
                        success: false,
                        error: { msg: "Not authorized to respond to this request", statusCode: 403 }
                    };
                }

                request.status = status;
                await request.save();
                return {
                    success: true,
                    res: `Friend request accept successfully`
                };
            }
            else {
                const deleteReq = await friendshipModel.deleteOne({ _id: reqId, reciever: userId });
                return {
                    success: true,
                    res: "Request Rejected Successfully"
                }
            }

        } catch (err) {
            console.error(err);
        }
    }

}