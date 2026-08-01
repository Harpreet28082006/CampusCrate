const express = require("express");
const router = express.Router();

const {
  createReport,
  getAllReports,
} = require("../controllers/reportController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, createReport);

router.get("/", protect, adminOnly, getAllReports);

module.exports = router;