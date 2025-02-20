const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./config/db")
const authRoutes = require('./routes/authRoutes')
const developerRoutes = require("./routes/developerRoutes")
const businessRoutes = require("./routes/businessRoutes")
const adminRoutes = require("./routes/adminRoutes")

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/developer", developerRoutes)
app.use("/api/business", businessRoutes)
app.use("/api/admin", adminRoutes  )

app.get("/", (req, res) => {
    res.send("Hello, World! Welcome to my Express server.");
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
   
});


