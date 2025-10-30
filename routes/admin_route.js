const express = require("express")
const router = express.Router();
const adminController = require("../controllers/admin_controller")
router.get("/",adminController.getadmin)
router.post("/",adminController.postadmin)
module.exports = router