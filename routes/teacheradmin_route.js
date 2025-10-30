const express = require("express")
const router = express.Router();
const teacheradminController = require("../controllers/teacheradmin_controller")
router.get("/",teacheradminController.getteacheradmin)
router.post("/",teacheradminController.postteacheradmin)
module.exports = router