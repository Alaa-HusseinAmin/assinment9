import express from "express";
import { userAuth } from "../../middelware/auth.js";
import { validation } from "../../middelware/validation.js";

import * as usercontroller from './user.controller.js';
import { ChangePasswordSchema, DeleteSchema, signInSchema, signUpSchema, UpdateSchema, userLogoutSchema } from "./user.validation.js";
const userRouter = express.Router();


userRouter.post("/signUp",validation(signUpSchema),usercontroller.signUp);
userRouter.post("/signIn",validation(signInSchema),usercontroller.signIn);
userRouter.get("/verify/:token",usercontroller.verify);
userRouter.put("/",validation(UpdateSchema),userAuth,usercontroller.Updateuser);
userRouter.delete("/",userAuth,validation(DeleteSchema),usercontroller.Deleteuser);
userRouter.put('/',userAuth,validation(ChangePasswordSchema),usercontroller.changePassword)
userRouter.get('/',userAuth,validation(userLogoutSchema),usercontroller.userLogout)


// userRouter.delete("/SoftDeleteUsers",userAuth,usercontroller.SoftDeleteUsers);


export default userRouter;
