import { UserRepository } from "./users.repository.js";
import { applicationError } from "../../middleware/errorhandling.js";
import bcrypt from "bcrypt";
import { env } from "../../config/env.js";
import jwtAuth from "../../middleware/jwttoken.js";
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
export class UserController {
   constructor() {
      this.userRepo = new UserRepository();
   }

   // UserAuth
   async register(req, res, next) {
      try {
         let { password } = req.body;

         if (!passwordRegex.test(password)) {
            return res.status(400).json({
               success: false,
               message:
                  "Password must be 8–16 characters and include at least one letter, one number, and one special character",
            });
         }

         password = await bcrypt.hash(password, 12);
         const resp = await this.userRepo.userRegister({ ...req.body, password });

         if (resp.success) {
            return res.status(201).json({
               success: true,
               msg: "User registration successful",
               res: resp.res,
            });
         } else {
            throw new applicationError(resp.error.msg, resp.error.statusCode)
         }
      } catch (err) {
         console.log(err);
         next(err);
      }
   }

   async signin(req, res, next) {
      try {
         const resp = await this.userRepo.login(req.body);

         if (resp.success) {
            const token = jwt.sign({ _id: resp.res._id }, env.jwtSecret, {
               expiresIn: "1h",
            });

            return res
               .cookie("jwtToken", token, {
                  maxAge: 1 * 60 * 60 * 1000,
                  httpOnly: true,
               })
               .json({ success: true, msg: "User login successful", token });
         } else {
            throw new applicationError(resp.error.msg, resp.error.statusCode);
         }
      } catch (err) {
         console.log(err);
         next(err);
      }
   }
   logout(req, res, next) {
      try {
         res.clearCookie("jwtToken").json({ success: true, msg: "Logout successful" });
      } catch (err) {
         console.log(err);
         next(err);
      }
   }



   // UserProfileCreation

   async getUserData(req, res, next) {
      try {
         const id = req.params.id;
         const getData = await this.userRepo.getUserData(id);
         console.log(getData);
         if (getData.success == false) {

            throw new applicationError(getData.error.msg, getData.error.statusCode);
         }
         return res.status(200).send(getData.res);
      }
      catch (err) {
         console.log(err);
         next(err);
      }
   }
   async getAllUserData(req, res, next) {
      try {
         const getAllData = await this.userRepo.getAllUserData()
         return res.status(200).send(getAllData);
      } catch (err) {
         next(err)
      }
   }
   async updateUserProifle(req, res, next) {
      try {
         const id = req.params.id;
         const updateData = await  this.userRepo.updateUserProfile(req.body, id,req.file.filename);
         console.log(updateData);
         if (updateData.success == true) {
            return res.status(201).send(updateData.res);
         }
         throw new applicationError(updateData.error.msg, updateData.error.statusCode);
      } catch (err) {
         next(err);
      }
   }


}