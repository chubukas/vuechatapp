module.exports = {
  messageSent: {
    subscribe: (_, args, { pubsub }) => {
      return pubsub.asyncIterator("CHATING");
    },
  },
};
