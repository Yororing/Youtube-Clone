import express from "express";
import { all } from "express/lib/application";
import {
    watch, 
    getEdit, 
    postEdit, 
    deleteVideo, 
    getUpload,
    postUpload
} from "../controllers/videosController";
import { protectorMiddleware, videoUpload } from "../middlewares";

//Create Videos Router
const videoRouter = express.Router();

//Upload
videoRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(videoUpload.single("video"), postUpload);

//Watch 
//:id = variable to \\d+ = digit Numeric
videoRouter.get("/:id([0-9a-f]{24})", watch);

//Edit
videoRouter
    .route("/:id([0-9a-f]{24})/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);

//Delete
videoRouter.route("/:id([0-9a-f]{24})/delete")
    .all(protectorMiddleware)
    .get(deleteVideo);

//Export
export default videoRouter;