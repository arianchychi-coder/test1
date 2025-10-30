const express = require("express")
const router = express.Router();
const teacherController = require("../controllers/teacher_controller")
router.get("/",teacherController.getTeacher)
router.post("/",teacherController.postTeacher)
module.exports = router