const express = require("express");
const MessageCtrl = require("../controllers/message");
const router = express.Router();
const FriendCtrl = require("../controllers/friends");
const UserCtrl = require("../controllers/users");
const AuthHelper = require("../Helpers/AuthHelper");

router.get(
  "/chat-messages/:sender_Id/:receiver_Id",
  AuthHelper.VerifyToken,
  MessageCtrl.GetAllMessages
);

router.get(
  "/receivers-messages/:sender/:receiver",
  AuthHelper.VerifyToken,
  MessageCtrl.MarkReceiverMessages
);

router.get(
  "/mark-all-messages",
  AuthHelper.VerifyToken,
  MessageCtrl.MarkAllMessages
);

router.post(
  "/chat-messages/:sender_Id/:receiver_Id",
  AuthHelper.VerifyToken,
  MessageCtrl.SendMessage
);

module.exports = router;
