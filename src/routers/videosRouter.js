import express from "express";

//Create Videos Router
const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Videos");

videoRouter.get("/watch", handleWatchVideo);

//Export
export default videoRouter;