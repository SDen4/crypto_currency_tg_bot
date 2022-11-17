const {
  btnsCurrencies,
  btnsStart,
  bnsTimer,
  btnsCurrenciesTimer,
} = require('./buttons');

const unkCmd = async (bot, chatId) => {
  const text = "Sorry, I don't understand you, please try again.";
  await bot.sendMessage(chatId, text);
};

const start = async (bot, chatId, msg) => {
  const text1 = `Hello, ${msg?.from?.first_name}! Welcome to Crypto Currency Light Bot!`;
  const text2 = 'Use menu to see the available commands';
  await bot.sendMessage(chatId, text1);
  await bot.sendMessage(chatId, text2);
};

const info = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Use buttons to get the currencies, BTC blocks info, to set a timer, to calculate your pool to USD or visit the application',
    btnsStart,
  );
};

const allCurrencies = async (bot, chatId) => {
  await bot.sendMessage(chatId, 'All currencies', btnsCurrencies);
};

const secret = async (bot, chatId) => {
  const url =
    'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp';
  await bot.sendSticker(chatId, url);
};

const setTmrMsgCur = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Select the currency for timer:',
    btnsCurrenciesTimer,
  );
};

const setTmrMsgTime = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    "You can set the timer manually in the format '/timer1', where '1' is the number of minutes after which the message will arrive or push a button below.",
    bnsTimer,
  );
};

const poolMsg = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Type your pool to convert it to USD (format: 3 btc 1 eth ...etc)',
  );
};

module.exports = {
  unkCmd,
  start,
  info,
  secret,
  setTmrMsgCur,
  setTmrMsgTime,
  allCurrencies,
  poolMsg,
};
