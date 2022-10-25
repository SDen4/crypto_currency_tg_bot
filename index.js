const TgBotApi = require('node-telegram-bot-api');

const token = require('./token');
const httpRequest = require('./httpRequest');

const bot = new TgBotApi(token, { polling: true });

bot.setMyCommands([
  { command: '/info', description: 'Information about currencies' },
  { command: '/btcusd', description: 'Currency BTC/USD' },
  { command: '/btceur', description: 'Currency BTC/EUR' },
  { command: '/ethusd', description: 'Currency ETH/USD' },
  { command: '/etheur', description: 'Currency ETH/EUR' },
]);

bot.on('callback_query', (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;

  httpRequest(bot, chatId, data);
});

const buttons = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC/USD', callback_data: '/btcusd' },
        { text: 'BTC/EUR', callback_data: '/btceur' },
        { text: 'ETH/USD', callback_data: '/ethusd' },
        { text: 'ETH/EUR', callback_data: '/etheur' },
      ],
    ],
  },
};

bot.on('message', async (msg) => {
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
      'Commands to get the crypto currencies:',
      buttons,
    );
  } else if (text === '/secret') {
    await bot.sendSticker(
      chatId,
      'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp',
    );
  } else if (
    text === '/btcusd' ||
    text === '/btceur' ||
    text === '/ethusd' ||
    text === '/etheur'
  ) {
    httpRequest(bot, chatId, text);
  } else {
    await bot.sendMessage(
      chatId,
      "Sorry, I don't understand you, please try again.",
    );
  }
});
