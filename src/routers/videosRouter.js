import express from "express";
import {
    watch, 
    getEdit, 
    postEdit, 
    deleteVideo, 
    getUpload,
    postUpload
} from "../controllers/videosController";

//Create Videos Router
const videoRouter = express.Router();

//Upload
videoRouter.route("/upload").get(getUpload).post(postUpload);

//Watch 
//:id = variable to \\d+ = digit Numeric
videoRouter.get("/:id([0-9a-f]{24})", watch);

//Edit
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);

//Delete
videoRouter.get("/:id([0-9a-f]{24})/delete").get(deleteVideo);

//Export
export default videoRouter;