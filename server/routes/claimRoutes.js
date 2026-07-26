const express = require("express");
const router = express.Router();

const {
  createClaim,
  getClaimsForItem,
  approveClaim,
  rejectClaim,
} = require("../controllers/claimController");
const { protect } = require("../middleware/authMiddleware");

// Submit a claim
router.post("/", protect, createClaim);

// Get all claims for an item
router.get("/item/:itemId", protect, getClaimsForItem);

// Approve a claim
router.put("/approve/:claimId", protect, approveClaim);

// Reject a claim
router.put("/reject/:claimId", protect, rejectClaim);
module.exports = router;