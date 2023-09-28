const isSenderAdminOrModerator = async (bot, chatId, userId) => {
  try {
    const chatMember = await bot.getChatMember(chatId, userId);
    if (chatMember.status === "member") return false;
    return true;
  } catch (error) {
    console.error(`Error checking user role: ${error.message}`);
    return false;
  }
};

const deleteMsg = async (bot, msg) => {
  const message = `Hello ${msg.from.first_name} !\n\nWe've removed your recent message because it contained an external link. Please note that posting links in this group is not allowed as per our community guidelines.`;
  bot
    .deleteMessage(msg.chat.id, msg.message_id)
    .then(() => {
      bot.sendMessage(msg.chat.id, message);
    })
    .catch((error) => {
      console.error(`Error deleting message: ${error}`);
    });
};

const checkLinks = async (bot, msg) => {
  if (!msg.entities && !msg.caption_entities) return;
  const isAdmin = await isSenderAdminOrModerator(bot, msg.chat.id, msg.from.id);
  if (isAdmin) return;
  const Items = msg.entities || msg.caption_entities;
  let flag = false;
  for (let i = 0; i < Items.length; i++) {
    if (Items[i].type === "url") {
      flag = true;
      break;
    }
  }
  if (flag === false) return;
  deleteMsg(bot, msg);
};

exports.messageHandler = async (bot, msg) => {
  if (msg.chat.type !== "private") {
    try {
      await checkLinks(bot, msg);
    } catch {
      console.log("Error in cheking for links..");
    }
  }
};
