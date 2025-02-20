const express = require("express")
const {getAllUsers, getUserProfile} = require("../controllers/adminControllers")
const authenticateUser = require("../middleware/authMiddleware")
const adminMiddleWare = require("../middleware/adminMiddleware")

const router = express.Router()

router.get("/users", authenticateUser, adminMiddleWare, getAllUsers )
router.get("/users/:id", authenticateUser, adminMiddleWare, getUserProfile )

module.exports = router