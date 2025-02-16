const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticateUser = (req, res, next)=> {
    try {
        const token = req.header("Authorization")
        if(!token){
            return res.status(401).json({message: "Access denied. No token provided"})
        }
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECREt)
        req.user = decoded
        next()
    } catch (error){
        return res.status(403).json({message: `Invalid or expired token ${error}`})
    }
}