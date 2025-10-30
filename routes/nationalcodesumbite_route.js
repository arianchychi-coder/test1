const express = require("express")
const router = express.Router();
const nationalcodesumbiteController = require("../controllers/nationalcodesumbite_controller")
router.post("/",nationalcodesumbiteController.checkNationalCode)
module.exports = router