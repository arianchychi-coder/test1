const express = require("express")
const router = express.Router();
const pageController = require("../controllers/page_controller")
router.get("/:id/:name",pageController.getPage)
module.exports = router