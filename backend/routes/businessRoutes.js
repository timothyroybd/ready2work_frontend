const express = require("express")
const {saveBusinessProfile, getBusinessProfile, createTask} = require("../controllers/businessControllers")
const authenticToken = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/profile", authenticToken, saveBusinessProfile)
router.get("/profile", authenticToken, getBusinessProfile)
router.post("/task", authenticToken, createTask)

module.exports = router