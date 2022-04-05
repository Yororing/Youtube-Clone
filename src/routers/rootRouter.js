import express from "express";
import { recommend, search } from "../controllers/videosController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/usersController";
import { publicOnlyMiddleware } from "../middlewares";

//Create Global Router
const rootRouter = express.Router();

rootRouter.get("/", recommend);
rootRouter.route("/users/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/users/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

//default Export
export default rootRouter;