exports.welcomeHandler = (bot, msg) => {
  let chatId = msg.chat.id;
  let newMembers = msg.new_chat_members;
  newMembers.forEach((newMember) => {
    let username;
    if (newMember.last_name)
      username = newMember.first_name + " " + newMember.last_name;
    else username = newMember.first_name;
    let message = `Welcome, ${username}! \n\nFeel free to introduce yourself and read the group guidelines/rules.`;
    bot
      .sendMessage(chatId, message)
      .catch((err) => console.log("Error sending message:", err));
  });
};
