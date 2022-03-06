//Call express from Module
import express from "express";

const PORT = 4000;
//Create express Application
const app = express();

//How to Using Express
const handleAccess = (req, res) => {
    return res.send("<h1>Access will be Done</h1>");
};
const handleLogin = (req, res) => {
    return res.send("Login here.");
};

//Get Request And Callback handleAccess
app.get("/", handleAccess);
app.get("/login", handleLogin);

const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

//Make CallBack on Port 4000
app.listen(PORT, handleListening);