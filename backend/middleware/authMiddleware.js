const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log("Token received:", token); // Debug: Check token received

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided" });
        } 

        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // Debug: Check token decoded

        req.user = decoded; // Assign decoded payload to req.user
        next();
    } catch (error) {
        return res.status(403).json({ message: `Invalid or expired token: ${error}` });
    }
};

module.exports = authenticateUser;
