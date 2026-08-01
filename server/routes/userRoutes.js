const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateMyProfile,
  updateProfilePhoto,
  changePassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Get logged-in user profile
router.get("/profile", protect, getMyProfile);

// Update logged-in user profile
router.put("/profile", protect, updateMyProfile);
// Update profile photo
router.put(
  "/profile/photo",
  protect,
  upload.single("photo"),
  updateProfilePhoto
);
// Change Password
router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;