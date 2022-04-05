import express from "express";
import {
    getEdit, postEdit, see, 
    startGithubLogin, finishGithubLogin,
    logout,
    getChangePassword,
    postChangePassword
} from "../controllers/usersController";
import { 
    protectorMiddleware, 
    publicOnlyMiddleware,
    avatarUpload,
} from "../middlewares";

// Create Users Router
const userRouter = express.Router();

// Log Out
userRouter.get("/logout", protectorMiddleware, logout);

// Edit User
userRouter.route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(avatarUpload.single("avatar"), postEdit);

// Change Password
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

// Login with GitHub
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, finishGithubLogin);

// See User Profile with ID
userRouter.get("/:id", see);

// Export Router
export default userRouter;
