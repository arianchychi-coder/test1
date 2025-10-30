const express = require("express")
const router = express.Router();
const sumbitController = require("../controllers/summbite_controllers")
router.get("/",sumbitController.getSumbite)
router.post("/",sumbitController.postSumbite)
module.exports = router