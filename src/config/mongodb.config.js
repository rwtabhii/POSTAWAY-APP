import mongoose from "mongoose";
import {env} from "../config/env.js";
import { Db } from "mongodb";
let baseUrl = env.Db;


export const createDbConnection = async () => {
    try {
        await mongoose.connect(baseUrl);
        console.log("MongoDB is connected using the Mongoose");
    }
    catch (err) {
        console.log(err);
    }

}