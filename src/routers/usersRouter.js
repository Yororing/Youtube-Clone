import express from "express";
import {edit, remove, see, logout} from "../controllers/usersController";

//Create Users Router
const userRouter = express.Router();

//Log Out
userRouter.get("/logout", logout);

//Edit User
userRouter.get("/edit", edit);

//Remove UserInfo
userRouter.get("/remove", remove);

//See User Profile with ID
userRouter.get("/:id", see);

//Export
export default userRouter;
