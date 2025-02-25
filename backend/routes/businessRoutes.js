const express = require("express")
const {saveBusinessProfile, getBusinessProfile, createTask, getTask, updateTask} = require("../controllers/businessControllers")
const authenticToken = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/profile", authenticToken, saveBusinessProfile)
router.get("/profile", authenticToken, getBusinessProfile)
router.post("/task", authenticToken, createTask)
router.get("/tasks", authenticToken,getTask )
router.patch("/:id/task", authenticToken, updateTask )

module.exports = router