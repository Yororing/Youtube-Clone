import express from "express";
import {watch, edit} from "../controllers/videosController";

//Create Videos Router
const videoRouter = express.Router();

//Watch
videoRouter.get("/watch", watch);

//Edit
videoRouter.get("/edit", edit);

//Export
export default videoRouter;