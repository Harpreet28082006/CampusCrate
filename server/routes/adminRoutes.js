const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAdminStats,
} = require("../controllers/adminController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Get all users
router.get("/users", protect, adminOnly, getAllUsers);

// Admin dashboard stats
router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;