const Item = require("../models/Item");
const Claim = require("../models/Claim");

const getDashboardStats = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();

    const lostItems = await Item.countDocuments({
      type: "lost",
    });

    const foundItems = await Item.countDocuments({
      type: "found",
    });

    const activeItems = await Item.countDocuments({
      status: "active",
    });

    const returnedItems = await Item.countDocuments({
      status: "returned",
    });

    const totalClaims = await Claim.countDocuments();

    const pendingClaims = await Claim.countDocuments({
      status: "pending",
    });

    const approvedClaims = await Claim.countDocuments({
      status: "approved",
    });

    const rejectedClaims = await Claim.countDocuments({
      status: "rejected",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalItems,
        lostItems,
        foundItems,
        activeItems,
        returnedItems,
        totalClaims,
        pendingClaims,
        approvedClaims,
        rejectedClaims,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};