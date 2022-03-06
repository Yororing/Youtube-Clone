import express from "express";
import {recommend} from "../controllers/videosController";
import {join} from "../controllers/usersController";

//Create Global Router
const globalRouter = express.Router();

globalRouter.get("/", recommend);
globalRouter.get("/join", join);

//default Export
export default globalRouter;