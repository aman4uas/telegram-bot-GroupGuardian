exports.startHandler = async (bot, msg) => {
  if (msg.chat.type !== "private") return;
  const chatId = msg.chat.id;
  const message =
    "Hi there!\n\nI'm your all-in-one chat group moderator. I filter out URLs, extend a warm welcome to new members, and lend a hand to administrators. My mission is to maintain a safe environment, boost engagement, and lighten the load for moderators. With customization options and 24/7 availability, I'm your group's steadfast guardian.\n\nFor knwoing about various commands: \n/help";
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};

exports.helpHandler = async (bot, msg) => {
  if (msg.chat.type !== "private") return;
  const chatId = msg.chat.id;
  const message = "This is from help response need to update later.";
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};

exports.getChatId = async (bot, msg) => {
  if (msg.chat.type === "private") return;
  const chatId = msg.chat.id;
  const message = `Chat ID of the group is "${chatId}"`;
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};
