const express = require("express")
const {saveDeveloperProfile, getDeveloperProfile} = require("../controllers/developerController")
const router = express.Router()

router.post("/profile", saveDeveloperProfile)
router.get("/profile/:user_id", getDeveloperProfile)

module.exports = router