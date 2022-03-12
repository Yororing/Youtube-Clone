import express from "express";
import {recommend, search} from "../controllers/videosController";
import {join, login} from "../controllers/usersController";

//Create Global Router
const globalRouter = express.Router();

globalRouter.get("/", recommend);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

//default Export
export default globalRouter;