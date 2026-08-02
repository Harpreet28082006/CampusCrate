const User = require("../models/User");
const Item = require("../models/Item");
const Claim = require("../models/Claim");
const Report = require("../models/Report");

// =============================
// GET ALL USERS
// =============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// ADMIN DASHBOARD STATS
// =============================
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const blockedUsers = await User.countDocuments({
      blocked: true,
    });

    const totalItems = await Item.countDocuments();

    const lostItems = await Item.countDocuments({
      type: "lost",
    });

    const foundItems = await Item.countDocuments({
      type: "found",
    });

    const returnedItems = await Item.countDocuments({
      status: "returned",
    });

    const pendingClaims = await Claim.countDocuments({
      status: "pending",
    });

    const pendingReports = await Report.countDocuments({
      status: "pending",
    });

    res.status(200).json({
      success: true,
      totalUsers,
      blockedUsers,
      totalItems,
      lostItems,
      foundItems,
      returnedItems,
      pendingClaims,
      pendingReports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getAdminStats,
};