const express = require("express");
const { handleChatMessage } = require("../controllers/chatbot_controller");
const router = express.Router();

router.post("/", handleChatMessage);
module.exports = router;
