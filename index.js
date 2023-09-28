require("dotenv").config();

const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const { welcomeHandler } = require("./handlers/welcome");
const { messageHandler } = require("./handlers/message");
const { startHandler } = require("./handlers/commands");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("new_chat_members", (msg) => welcomeHandler(bot, msg));
bot.on("message", (msg) => messageHandler(bot, msg));
bot.onText(/^\/start *$/, (msg) => startHandler(bot, msg));

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile("index.html"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));