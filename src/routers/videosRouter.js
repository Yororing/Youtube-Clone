import express from "express";
import {
    watch, 
    getEdit, 
    postEdit, 
    deleteVideo, 
    upload
} from "../controllers/videosController";

//Create Videos Router
const videoRouter = express.Router();

//Upload
videoRouter.get("/upload", upload);

//Watch 
//:id = variable to \\d+ = digit Numeric
videoRouter.get("/:id(\\d+)", watch);

//Edit
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

//Delete
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

//Export
export default videoRouter;