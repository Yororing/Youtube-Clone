import express from "express";

//Create Users Router
const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit Users");

userRouter.get("/edit", handleEditUser);

//Export
export default userRouter;
