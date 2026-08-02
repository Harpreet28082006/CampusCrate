const express = require("express");
const router = express.Router();

const {
  getMyNotifications,
  markNotificationRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// Get logged-in user's notifications
router.get("/", protect, getMyNotifications);

// Mark notification as read
router.patch("/:id/read", protect, markNotificationRead);

module.exports = router;