
const {promiseDb} = require("../config/db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const signup = async(req, res) => {
    try {
        // get the email, password and userType from the request body
        const {email, password, userType} = req.body

        const [existingUser] = await promiseDb.query(
            "SELECT * FROM users WHERE email = ?", [email]
        )
        if(existingUser.length > 0) {
            return res.status(400).json({message: "User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const [result] = await promiseDb.query(
            "INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)",
            [email, hashedPassword, userType]
        )
        const token = jwt.sign(
            {userId: result.insertId, email, userType},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        res.status(201).json({
            message: "User registered successfully",
            token, 
            user: {id: result.insertId, email, userType}
        })
    } catch(error) {
        console.error("Signup Error", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body

        const [user] = await promiseDb.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        )
        if(user.length ===0) {
            return res.status(401).json({message: "Invaid email or password"})
        }
        const validPassword = await bcrypt.compare(password, user[0].password)
        if(!validPassword){
            return res.status(401).json({message: "Invaid email or password"})
        }

        const token = jwt.sign(
            {userId: user[0].id, email: user[0].email, userType: user[0].user_type},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )
        if(!user[0].profile_completed){
            return res.status(200).json({
                message: "Profile incomplete, please complete your profile",
                profileIncomplete: true, 
                token, 
                user: {
                    id: user[0].id,
                    email: user[0].email,
                    userType: user[0].user_type

                }
            })
        }

        res.status(200).json({
            message: "Login successful",
            token, 
            user: {
                id: user[0].id,
                email: user[0].email,
                userType: user[0].user_type
            }
        })


    }
    catch (error){
        console.log("Login Error", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body
        const [admin] = await promiseDb.query(
            "SELECT * FROM users WHERE email = ? And is_admin = TRUE", [email]
        )
        if(admin.length === 0){
            return res.status(401).json({message: "Invalid admin credentials"})
        }

        //validate password
        const validatePassword = await bcrypt.compare(password, admin[0].password)
        if(!validatePassword) {
            return res.status(401).json({message: "Invalid admin credentials"})
        }
        const token = jwt.sign(
            {userId: admin[0].id, email: admin[0].email, userType: "admin", is_admin: admin[0].is_admin === 1 },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.status(200).json({
            message: "Admin login succesful",
            token,
            user: {
                id: admin[0].id,
                email: admin[0].email,
                userType: "admin",
                is_admin: admin[0].is_admin
            }
        })
    } catch(error){
        console.log("Admin Login Error", error);
        res.status(500).json({message: "Internal Server Error"})

    }
}
module.exports = {signup, login, adminLogin}

