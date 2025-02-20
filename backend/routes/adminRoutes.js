const express = require("express")
const getAllUsers = require("../controllers/adminControllers")
const authenticateUser = require("../middleware/authMiddleware")
const adminMiddleWare = require("../middleware/adminMiddleware")

const router = express.Router()

router.get("/users", authenticateUser, adminMiddleWare, getAllUsers )


module.exports = router