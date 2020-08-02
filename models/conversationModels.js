const mongoose = require("mongoose");
const ConversationSchema = mongoose.Schema({
  participants: [
    {
      senderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    },
  ],
});
module.exports = mongoose.model("conversation", ConversationSchema);
