const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "claim",
        "match",
        "report",
        "system",
      ],
      default: "system",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },

    relatedClaim: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);