const { buttons, buttonsTimer } = require('./buttons');

const unkCmd = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    "Sorry, I don't understand you, please try again.",
  );
};

const start = async (bot, chatId, msg) => {
  const text = `Hello, ${msg?.from?.first_name}! Welcome to Crypto Currency Light Bot!`;
  await bot.sendMessage(chatId, text);
};

const info = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Push the button to get the currency, or set a timer',
    buttons,
  );
};

const secret = async (bot, chatId) => {
  await bot.sendSticker(
    chatId,
    'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp',
  );
};

const tmrMsg = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    "You can set a timer for BTC/USD in the format '/timer1', where '1' is the number of minutes after which the message will arrive or push a button below.",
    buttonsTimer,
  );
};

module.exports = { unkCmd, start, info, secret, tmrMsg };
