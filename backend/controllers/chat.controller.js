const Chat = require("../models/Chat");

module.exports = {
  // GET ALL CHATS
  chats: async () => {
    try {
      const chats = await Chat.find();

      return chats;
    } catch (error) {
      console.log(error);
    }
  },

  // SEND MESSAGE
  sendMessage: async (_, { from, message }, { pubsub }) => {
    try {
      const chat = await Chat.create({ from, message });

      pubsub.publish("CHATING", { messageSent: chat });

      return chat;
    } catch (error) {
      console.log(error);
    }
  },
};
