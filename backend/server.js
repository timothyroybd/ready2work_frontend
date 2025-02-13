const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./config/db")
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello, World! Welcome to my Express server.");
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
   
});


