const Item = require("../models/Item");
const Claim = require("../models/Claim");
const User = require("../models/User");

// Get logged-in user profile
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const lostItems = await Item.countDocuments({
  postedBy: req.user.id,
  type: "lost",
});

const foundItems = await Item.countDocuments({
  postedBy: req.user.id,
  type: "found",
});

const claimsMade = await Claim.countDocuments({
  claimantId: req.user.id,
});

const approvedClaims = await Claim.countDocuments({
  claimantId: req.user.id,
  status: "approved",
});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

   res.status(200).json({
  success: true,
  user,
  stats: {
    lostItems,
    foundItems,
    claimsMade,
    approvedClaims,
  },
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update logged-in user profile
const updateMyProfile = async (req, res) => {
  try {
    const {
      name,
      college,
      phone,
      course,
      bio,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.college = college || user.college;
    user.phone = phone || user.phone;
    user.course = course || user.course;
    user.bio = bio || user.bio;

    await user.save();

    const updatedUser = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update profile photo
const updateProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    user.profilePhoto = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      profilePhoto: user.profilePhoto,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getMyProfile,
  updateMyProfile,
  updateProfilePhoto,
};