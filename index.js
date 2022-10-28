const TgBotApi = require('node-telegram-bot-api');

const token = require('./token');
const httpRequest = require('./httpRequest');

const bot = new TgBotApi(token, { polling: true });

bot.setMyCommands([
  { command: '/info', description: 'Currencies' },
  { command: '/btcusd', description: 'Currency BTC/USD' },
  { command: '/btceur', description: 'Currency BTC/EUR' },
  { command: '/ethusd', description: 'Currency ETH/USD' },
  { command: '/etheur', description: 'Currency ETH/EUR' },
]);

const buttons = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC/USD', callback_data: '/btcusd' },
        { text: 'BTC/EUR', callback_data: '/btceur' },
        { text: 'ETH/USD', callback_data: '/ethusd' },
        { text: 'ETH/EUR', callback_data: '/etheur' },
      ],
      [{ text: 'Set timer for BTC/USD', callback_data: '/settimer' }],
    ],
  },
};

const messageFunc = async (msg) => {
  const firstName = msg?.from?.first_name;
  const lastName = msg?.from?.last_name;

  const text = msg?.text;
  const chatId = msg?.chat?.id;

  if (text === '/start') {
    await bot.sendMessage(
      chatId,
      `Hello, ${firstName}! Welcome to Crypto Currency Light Bot!`,
    );
  } else if (text === '/info') {
    await bot.sendMessage(
      chatId,
      'Push the button to get the currency, or set a timer',
      buttons,
    );
  } else if (text === '/secret') {
    await bot.sendSticker(
      chatId,
      'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp',
    );
  } else if (text.includes('/timer')) {
    const timeInMinutes = Number(text.slice(6));
    if (timeInMinutes) {
      setTimeout(() => {
        httpRequest(bot, chatId, '/btcusd');
      }, timeInMinutes * 60000);
    } else {
      await bot.sendMessage(chatId, 'Invalid parameter');
    }
  } else {
    await bot.sendMessage(
      chatId,
      "Sorry, I don't understand you, please try again.",
    );
  }
};

const buttonsFunc = async (msg) => {
  const chatId = msg.message.chat.id;
  const text = msg?.data;

  if (text === '/settimer') {
    await bot.sendMessage(
      chatId,
      "You can set a timer in the format '/timerX', where 'X' is the number of minutes after which the message will arrive.",
    );
  } else {
    httpRequest(bot, chatId, text);
  }
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
