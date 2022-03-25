// Initialize JavaScript
import "./database";
import videoModel from "./models/Video";
import app from "./server";

const PORT = 4000;

//Server Listening
const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

//Make CallBack on Port 4000
app.listen(PORT, handleListening);