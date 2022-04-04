import express from "express";
import { recommend, search } from "../controllers/videosController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/usersController";

//Create Global Router
const rootRouter = express.Router();

rootRouter.get("/", recommend);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

//default Export
export default rootRouter;