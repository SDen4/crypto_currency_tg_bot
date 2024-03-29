const TgBotApi = require('node-telegram-bot-api');

const { token } = require('./token');
const bot = new TgBotApi(token, { polling: true });

const { ban } = require('./src/utils/ban');
const { cndtnFunc } = require('./src/utils/cndtnFunc');
const { bfHttpRequest } = require('./src/api/bfHttpRequest');
const { btcBlockInfo } = require('./src/modules/btcBlockInfo');
const { timer } = require('./src/modules/timer');
const { pool } = require('./src/modules/pool');
const { visitors } = require('./src/statistic/visitors');
const { saveStat, getStat } = require('./src/statistic/statistic');
const { convertShortCommands } = require('./src/modules/convertShortCommands');
const { commands } = require('./src/modules/buttons');
const {
  cndtnCurrencies,
  cndtnInfo,
  cndtnCurrenciesBtns,
  cndtnSecret,
  cndtnStart,
  cndtnBtcBlockInfo,
  cndtnPool,
  cndtnStatistic,
  cndtnEugFunc,
  cndtnEmoji,
} = require('./src/modules/conditions');
const {
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
} = require('./src/modules/messages');
const { percentAlertMessage } = require('./src/modules/percentAlertMessage');

let selectedCurrency = '';

bot.setMyCommands(commands);

percentAlertMessage(bot);

const messageFunc = async (msg) => {
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  saveStat(msg);


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
  } else if (cndtnPool(text)) {
    pool(bot, chatId, text);
  } else if (text === '/pool') {
    poolMsg(bot, chatId);
  } else if (cndtnStatistic(text, msg)) {
    const quant = Number(String(text).match(/\d+/g)?.[0]) || 10;
    const stat = await getStat();
    await statisticMsg(bot, chatId, stat, quant);
  } else if (cndtnEugFunc(text, msg)) {
    // parallel requests
    await Promise.all([
      bfHttpRequest(bot, chatId, '/btcusd'),
      btcBlockInfo(bot, chatId),
    ]);
  } else if (cndtnEmoji(text)) {
    emojiMsg(text, bot, chatId);
  } else {
    unkCmd(bot, chatId);
  }
  visitors(bot, msg);
};

const buttonsFunc = async (msg) => {
  const chatId = msg?.message?.chat?.id;
  const text = msg?.data;

  saveStat(msg);

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
  } else if (cndtnBtcBlockInfo(text)) {
    btcBlockInfo(bot, chatId);
  } else if (text === '/pool') {
    poolMsg(bot, chatId);
  } else {
    bfHttpRequest(bot, chatId, text);
  }
  visitors(bot, msg);
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
