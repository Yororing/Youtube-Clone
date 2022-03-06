//Call express, morgan from Module
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videosRouter";

const PORT = 4000;
//Create express Application
const app = express();
//Create Controller or Middleware
const logger = morgan("dev");
app.use(logger);

//Using Routers
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

//Server Listening
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

//Make CallBack on Port 4000
app.listen(PORT, handleListening);