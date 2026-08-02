const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    photoUrl: {
      type: String,
      default: "",
    },

    qrCode: {
  type: String,
  default: "",
},

    status: {
      type: String,
      enum: ["active", "claimed", "returned"],
      default: "active",
    },

    claimQuestion: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);