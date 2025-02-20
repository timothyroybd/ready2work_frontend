const express = require("express")
const {saveBusinessProfile, getBusinessProfile} = require("../controllers/businessControllers")
const authenticToken = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/profile", authenticToken, saveBusinessProfile)
router.get("/profile", authenticToken, getBusinessProfile)

module.exports = router