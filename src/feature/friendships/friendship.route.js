import express from "express";
import { friendshipController } from "./friendship.controller.js";
import jwtAuth from "../../middleware/jwttoken.js";

const friendshipRoute = express.Router();

const friendshipcontroller = new friendshipController();


friendshipRoute.get("/",jwtAuth, (req, res, next) => {

    friendshipcontroller.getUserFriends(req, res, next);
});
friendshipRoute.get("/req",jwtAuth, (req, res, next) => {

    friendshipcontroller.getPendingReq(req, res, next);
});
friendshipRoute.post("/friendreq/:id",jwtAuth, (req, res, next) => {

    friendshipcontroller.sendingReq(req, res, next);
});
friendshipRoute.patch("/togglereq", jwtAuth,(req, res, next) => {

    friendshipcontroller.AccOrRejReq(req, res, next);
});



export default friendshipRoute;
