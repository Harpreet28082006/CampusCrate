const express = require("express");
const router = express.Router();
const {
  createReport,
  getAllReports,
  approveReport,
  rejectReport,
} = require("../controllers/reportController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, createReport);

router.get("/", protect, adminOnly, getAllReports);
// Approve report
router.patch("/approve/:id", protect, adminOnly, approveReport);

// Reject report
router.patch("/reject/:id", protect, adminOnly, rejectReport);

module.exports = router;