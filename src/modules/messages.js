const {
  btnsCurrencies,
  btnsStart,
  bnsTimer,
  btnsCurrenciesTimer,
} = require('./buttons');

const { timestamp } = require('../utils/timestamp');

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

const statisticMsg = async (bot, chatId, stat, quant) => {
  const formatStat = Object.values(stat.data)
    .slice(-quant)
    .map((el, i) => {
      const date = el?.message?.date || el?.date;
      const firstName = el?.chat?.first_name || el?.from?.first_name;
      const id = el?.chat?.id || el?.from?.id;
      const username = el?.chat?.username || el?.from?.username || '';
      const text = el?.text || el?.data;
      const lang = el?.from?.language_code;

      return `${i + 1}. ${timestamp(date)} | ${firstName} (${id}${
        username && '/'
      }${username}) | ${lang} | text: ${text}\n`;
    })
    .join('');

  await bot.sendMessage(
    chatId,
    `Statistic:\n----------------------\n${formatStat}`,
  );
};

const emojiMsg = async (text, bot, chatId) => {
  const hex = (
    Number(text.codePointAt(0)) + Number((Math.random() * 10 + 1).toFixed(0))
  ).toString(16);
  await bot.sendMessage(chatId, String.fromCodePoint('0x' + hex));
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
  statisticMsg,
  emojiMsg,
};
