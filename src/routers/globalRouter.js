import express from "express";

//Create Global Router
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

//default Export
export default globalRouter;