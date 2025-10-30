const express = require("express")
const router = express.Router();
const teachernationalcodesumbiteController = require("../controllers/teachertnationalcodesumbite_controller")
router.post("/",teachernationalcodesumbiteController.postteachernationalcode)
module.exports = router