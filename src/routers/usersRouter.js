import express from "express";
import {
    edit, remove, see, 
    startGithubLogin, finishGithubLogin,
    logout
} from "../controllers/usersController";

// Create Users Router
const userRouter = express.Router();

// Log Out
userRouter.get("/logout", logout);

// Edit User
userRouter.get("/edit", edit);

// Remove UserInfo
userRouter.get("/remove", remove);

// Login with GitHub
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callback", finishGithubLogin);

// See User Profile with ID
userRouter.get("/:id", see);

// Export Router
export default userRouter;
