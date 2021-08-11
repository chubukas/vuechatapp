const Chat = require("../../controllers/chat.controller");
const User = require("../../controllers/user.controller");

module.exports = {
  chats: Chat.chats,
  users: User.users,
  user: User.user,
};
