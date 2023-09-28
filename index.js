require("dotenv").config();

const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const { welcomeHandler } = require("./handlers/welcome");
const { messageHandler } = require("./handlers/message");
const { startHandler, helpHandler, getChatId } = require("./handlers/commands");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("new_chat_members", (msg) => welcomeHandler(bot, msg));
bot.on("message", (msg) => messageHandler(bot, msg));
bot.onText(/^\/start *$/, (msg) => startHandler(bot, msg));
bot.onText(/^\/help *$/, (msg) => helpHandler(bot, msg));
bot.onText(/^\/chatid *$/, (msg) => getChatId(bot, msg));

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile("index.html"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

/*
// Define states for the conversation
const states = {
  START: "start",
  COLLECT_DATE: "collect_date",
  COLLECT_TIME: "collect_time",
  COLLECT_MESSAGE: "collect_message",
};

// Store user data in a map (you can use a database in production)
const userData = new Map();

// Start a conversation
bot.onText(/\/schedule/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Initialize user data
  userData.set(userId, {
    state: states.COLLECT_DATE,
    data: {},
  });

  // Start the conversation
  bot.sendMessage(chatId, "Please enter the date (YYYY-MM-DD):");
});

// Listen for user input
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userState = userData.get(userId);

  if (!userState) return; // Ignore messages from users not in a conversation

  switch (userState.state) {
    case states.COLLECT_DATE:
      const dateInput = msg.text;
      // Validate and store the date
      // ...

      // Update user state and request next input
      userState.state = states.COLLECT_TIME;
      userState.data.date = dateInput;
      bot.sendMessage(chatId, "Please enter the time (HH:MM):");
      break;

    case states.COLLECT_TIME:
      const timeInput = msg.text;
      // Validate and store the time
      // ...

      // Update user state and request next input
      userState.state = states.COLLECT_MESSAGE;
      userState.data.time = timeInput;
      bot.sendMessage(chatId, "Please enter the message you want to schedule:");
      break;

    case states.COLLECT_MESSAGE:
      const message = msg.text;
      // Validate and store the message
      // ...

      // Complete the conversation and schedule the message
      bot.sendMessage(chatId, "Message scheduled successfully!");
      const scheduledData = userState.data;
      // Implement scheduling logic here using scheduledData
      // ...

      // Clear user data to end the conversation
      userData.delete(userId);
      break;

    default:
      // Handle unexpected states or errors
      bot.sendMessage(chatId, "Oops! Something went wrong.");
      userData.delete(userId); // Clear user data to end the conversation
      break;
  }
});

*/
