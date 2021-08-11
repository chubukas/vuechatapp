const Chat = require("../../controllers/chat.controller");
const User = require("../../controllers/user.controller");

module.exports = {
  sendMessage: Chat.sendMessage,
  createUser: User.signUp,
  signIn: User.signIn,
};
