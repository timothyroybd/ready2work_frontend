const express = require("express")
const {getAllUsers, updateUser, updateDeveloperProfile, deleteUser} = require("../controllers/adminControllers")
const authenticateUser = require("../middleware/authMiddleware")
const adminMiddleWare = require("../middleware/adminMiddleware")

const router = express.Router()

router.get("/users", authenticateUser, adminMiddleWare, getAllUsers )
router.patch("/users/:id", authenticateUser, adminMiddleWare, updateUser)
router.patch("/users/:id/developer-profile", authenticateUser, adminMiddleWare, updateDeveloperProfile)
router.delete("/users/:id", authenticateUser, adminMiddleWare, deleteUser)


module.exports = router