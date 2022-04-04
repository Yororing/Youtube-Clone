import express from "express";
import {
    edit, see, 
    startGithubLogin, finishGithubLogin,
    logout
} from "../controllers/usersController";

// Create Users Router
const userRouter = express.Router();

// Log Out
userRouter.get("/logout", logout);

// Edit User
userRouter.get("/edit", edit);

// Login with GitHub
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callback", finishGithubLogin);

// See User Profile with ID
userRouter.get("/:id", see);

// Export Router
export default userRouter;
