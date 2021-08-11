const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    from: {
      type: String,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chats", chatSchema);

module.exports = Chat;
