const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  getConversations,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

// GET all conversations
router.get("/", protect, getConversations);

// GET messages of one claim
router.get("/:claimId", protect, getMessages);

// Send message
router.post("/", protect, sendMessage);

module.exports = router;