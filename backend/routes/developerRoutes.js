const express = require("express")
const {saveDeveloperProfile, getDeveloperProfile, editDeveloperPorifle} = require("../controllers/developerController")
const authenticateUser = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/profile", authenticateUser, saveDeveloperProfile)
router.get("/profile/:id", authenticateUser, getDeveloperProfile)
router.patch("/profile", authenticateUser, editDeveloperPorifle)

module.exports = router