const TgBotApi = require('node-telegram-bot-api');

const { token } = require('./token');
const bot = new TgBotApi(token, { polling: true });

const { ban } = require('./src/utils/ban');
const { cndtnFunc } = require('./src/utils/cndtnFunc');
const { bfHttpRequest } = require('./src/api/bfHttpRequest');
const { btcBlockInfo } = require('./src/modules/btcBlockInfo');
const { stat } = require('./src/modules/stat');
const { timer } = require('./src/modules/timer');
const { convertShortCommands } = require('./src/modules/convertShortCommands');
const { commands, bnsTimer } = require('./src/modules/buttons');
const {
  cndtnCurrencies,
  cndtnInfo,
  cndtnCurrenciesBtns,
  cndtnSecret,
  cndtnStart,
  cndtnBtcBlockInfo,
} = require('./src/modules/conditions');
const {
  unkCmd,
  start,
  info,
  secret,
  setTmrMsgCur,
  setTmrMsgTime,
  allCurrencies,
} = require('./src/modules/messages');

let selectedCurrency = '';

bot.setMyCommands(commands);

const messageFunc = async (msg) => {
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  if (ban(bot, chatId, msg)) return null;

  if (cndtnStart(text)) {
    start(bot, chatId, msg);
  } else if (cndtnInfo(text)) {
    info(bot, chatId);
  } else if (cndtnCurrencies(text)) {
    const formatText = convertShortCommands(text);
    bfHttpRequest(bot, chatId, formatText);
  } else if (cndtnSecret(text)) {
    secret(bot, chatId);
  } else if (cndtnFunc(text).includes('/timer')) {
    timer(bot, chatId, text, selectedCurrency);
    selectedCurrency = '';
  } else if (cndtnBtcBlockInfo(text)) {
    btcBlockInfo(bot, chatId);
  } else if (cndtnCurrenciesBtns(text)) {
    allCurrencies(bot, chatId);
  } else {
    unkCmd(bot, chatId);
  }
  stat(bot, msg);
};

const buttonsFunc = async (msg) => {
  const chatId = msg?.message?.chat?.id;
  const text = msg?.data;

  if (ban(bot, chatId, msg)) return null;

  if (text === '/settimer') {
    setTmrMsgCur(bot, chatId);
  } else if (text.includes('_set_timer')) {
    selectedCurrency = String(text).slice(0, 7);
    setTmrMsgTime(bot, chatId);
  } else if (cndtnCurrenciesBtns(text)) {
    allCurrencies(bot, chatId);
  } else if (text.includes('/timer')) {
    timer(bot, chatId, text, selectedCurrency);
    selectedCurrency = '';
  } else if (cndtnBtcBlockInfo(text)) {
    btcBlockInfo(bot, chatId);
  } else {
    bfHttpRequest(bot, chatId, text);
  }
  stat(bot, msg);
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
