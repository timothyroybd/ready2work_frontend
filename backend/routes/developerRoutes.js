const express = require("express")
const {saveDeveloperProfile, getDeveloperProfile} = require("../controllers/developerController")
const authenticateUser = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/profile", authenticateUser, saveDeveloperProfile)
router.get("/profile/:user_id", authenticateUser, getDeveloperProfile)

module.exports = router