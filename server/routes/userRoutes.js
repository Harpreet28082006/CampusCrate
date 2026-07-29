const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Get logged-in user profile
router.get("/profile", protect, getMyProfile);

// Update logged-in user profile
router.put("/profile", protect, updateMyProfile);

module.exports = router;