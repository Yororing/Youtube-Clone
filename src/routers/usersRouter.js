import express from "express";
import {edit, remove} from "../controllers/usersController";

//Create Users Router
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);

//Export
export default userRouter;
