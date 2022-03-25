//Call express, morgan from Module
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videosRouter";

//Create express Application
const app = express();
//Create Controller or Middleware
const logger = morgan("dev");
app.use(logger);
//For Use req.body
app.use(express.urlencoded({ extended: true}));

//Set Pug View Engine
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//Using Routers
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;