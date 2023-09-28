exports.startHandler = async (bot, msg) => {
  const chatId = msg.chat.id;
  const message =
    "Hi there!\n\nI'm your all-in-one chat group moderator. I filter out URLs, extend a warm welcome to new members, and lend a hand to administrators. My mission is to maintain a safe environment, boost engagement, and lighten the load for moderators. With 24/7 availability, I'm your group's steadfast guardian.";
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};
