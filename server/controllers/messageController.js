const Message = require("../models/Message");
const Claim = require("../models/Claim");

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { claimId, receiver, message } = req.body;

    const claim = await Claim.findById(claimId);

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    const newMessage = await Message.create({
      claimId,
      sender: req.user.id,
      receiver,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      newMessage,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Chat Messages of a Claim
const getMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      claimId: req.params.claimId,
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getConversations = async (req, res) => {
  try {

    const conversations = await Message.find({

      $or: [

        { sender: req.user.id },

        { receiver: req.user.id }

      ]

    })

      .populate({
        path: "claimId",
        populate: {
          path: "itemId",
          select: "title photoUrl"
        }
      })

      .populate("sender", "name profilePhoto")

      .populate("receiver", "name profilePhoto")

      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      conversations

    });

  }

  catch(error){

    res.status(500).json({

      success:false,

      message:error.message

    });

  }

};


module.exports = {
  sendMessage,
  getMessages,
  getConversations,
};