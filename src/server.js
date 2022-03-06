//Call express, morgan from Module
import express from "express";
import morgan from 'morgan';

const PORT = 4000;
//Create express Application
const app = express();
//Create Controller or Middleware
const logger = morgan("dev");

const handleHome = (req, res) => {
    return res.send(`Hello`);
};

app.use(logger);
app.get("/", handleHome);

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

//Make CallBack on Port 4000
app.listen(PORT, handleListening);