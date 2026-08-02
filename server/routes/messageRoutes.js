const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

// Send a message
router.post("/", protect, sendMessage);

// Get all messages for a claim
router.get("/:claimId", protect, getMessages);

module.exports = router;