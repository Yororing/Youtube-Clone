import express from "express";
import {see, edit, deleteVideo, upload} from "../controllers/videosController";

//Create Videos Router
const videoRouter = express.Router();

//Upload
videoRouter.get("/upload", upload);

//Watch 
//:id = variable to \\d+ = digit Numeric
videoRouter.get("/:id(\\d+)", see);

//Edit
videoRouter.get("/:id(\\d+)/edit", edit);

//Delete
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

//Export
export default videoRouter;