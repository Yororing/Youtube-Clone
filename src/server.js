//Call express, morgan from Module
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/usersRouter";
import videoRouter from "./routers/videosRouter";
import { localsMiddleware } from "./middlewares";

// Create express Application
const app = express();

// Create Controller or Middleware
const logger = morgan("dev");
app.use(logger);

// For Use req.body
app.use(express.urlencoded({ extended: true}));

// Use Session MiddleWare For Logged In User
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        // Session Store on Mongo DB
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
);

// Set Pug View Engine
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

//Using Routers
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;