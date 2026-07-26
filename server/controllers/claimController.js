const Claim = require("../models/Claim");
const Item = require("../models/Item");

// Create a claim
const createClaim = async (req, res) => {
  try {
    const { itemId, message } = req.body;

    // Check if item exists
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    // Check if user is trying to claim their own item
    if (item.postedBy.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot claim your own item",
      });
    }

    // Check if claim already exists
    const existingClaim = await Claim.findOne({
      itemId,
      claimantId: req.user.id,
    });

    if (existingClaim) {
      return res.status(400).json({
        success: false,
        message: "You have already claimed this item",
      });
    }

    // Create claim
    const claim = await Claim.create({
      itemId,
      claimantId: req.user.id,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Get all claims for a specific item
const getClaimsForItem = async (req, res) => {
  try {
    const claims = await Claim.find({
      itemId: req.params.itemId,
    })
      .populate("claimantId", "name email")
      .populate("itemId", "title type");

    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Approve a claim
const approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    // Approve the claim
    claim.status = "approved";
    await claim.save();

    // Update item status
    await Item.findByIdAndUpdate(claim.itemId, {
      status: "returned",
    });

    res.status(200).json({
      success: true,
      message: "Claim approved successfully",
      claim,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Reject a claim
const rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    // Reject the claim
    claim.status = "rejected";

    await claim.save();

    res.status(200).json({
      success: true,
      message: "Claim rejected successfully",
      claim,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createClaim,
  getClaimsForItem,
  approveClaim,
  rejectClaim,
};