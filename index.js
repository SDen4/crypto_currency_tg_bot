const TgBotApi = require('node-telegram-bot-api');

const token = require('./token');
const httpRequest = require('./httpRequest');
const mpHttpRequest = require('./mpHttpRequest');
const timer = require('./timer');

const { buttons, buttonsTimer } = require('./buttons');

const bot = new TgBotApi(token, { polling: true });

bot.setMyCommands([
  { command: '/info', description: 'Currencies' },
  { command: '/btcusd', description: 'Currency BTC/USD' },
  { command: '/btceur', description: 'Currency BTC/EUR' },
  { command: '/ethusd', description: 'Currency ETH/USD' },
  { command: '/etheur', description: 'Currency ETH/EUR' },
]);

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
  } else if (
    text === '/btcusd' ||
    text === '/btceur' ||
    text === '/ethusd' ||
    text === '/etheur'
  ) {
    httpRequest(bot, chatId, text);
  } else if (text === '/secret') {
    await bot.sendSticker(
      chatId,
      'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp',
    );
  } else if (text.includes('/timer')) {
    timer(bot, chatId, text);
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
      "You can set a timer for BTC/USD in the format '/timer1', where '1' is the number of minutes after which the message will arrive or push a button below.",
      buttonsTimer,
    );
  } else if (text.includes('/timer')) {
    timer(bot, chatId, text);
  } else if (text === '/btcFees') {
    const allData = await mpHttpRequest();

    if (allData?.length) {
      await bot.sendMessage(
        chatId,
        `Median fee: ${Math.ceil(
          allData[0].medianFee,
        ).toFixed()} sat/vB\nTotal fees: ${(
          Math.ceil(allData[0].totalFees) / 100000000
        ).toFixed(3)} BTC`,
      );
    } else {
      await bot.sendMessage(chatId, 'No data');
    }
  } else {
    httpRequest(bot, chatId, text);
  }
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
