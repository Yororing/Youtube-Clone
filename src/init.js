// Load .env
import "dotenv/config";

import "regenerator-runtime";

// Initialize JavaScript
import "./database";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

//Server Listening
const handleListening = () =>
    console.log(`Server listening on port http://localhost:${PORT}`);

//Make CallBack on Port 4000
app.listen(PORT, handleListening);