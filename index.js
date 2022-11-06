const TgBotApi = require('node-telegram-bot-api');

const { token } = require('./token');
const bot = new TgBotApi(token, { polling: true });

const { ban } = require('./src/utils/ban');
const { bfHttpRequest } = require('./src/api/bfHttpRequest');
const { btcBlockInfo } = require('./src/modules/btcBlockInfo');
const { stat } = require('./src/modules/stat');
const { timer } = require('./src/modules/timer');
const { commands } = require('./src/modules/buttons');
const {
  unkCmd,
  start,
  info,
  secret,
  tmrMsg,
} = require('./src/modules/messages');

bot.setMyCommands(commands);

const messageFunc = async (msg) => {
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  if (ban(bot, chatId, msg)) return null;

  if (text === '/start') {
    start(bot, chatId, msg);
  } else if (
    String(text).toLocaleLowerCase() === '/info' ||
    String(text).toLocaleLowerCase() === 'info' ||
    String(text).toLocaleLowerCase() === '/help' ||
    String(text).toLocaleLowerCase() === 'help'
  ) {
    info(bot, chatId);
  } else if (
    String(text).toLocaleLowerCase() === '/btcusd' ||
    String(text).toLocaleLowerCase() === '/btceur' ||
    String(text).toLocaleLowerCase() === '/ethusd' ||
    String(text).toLocaleLowerCase() === '/etheur' ||
    String(text).toLocaleLowerCase() === '/ltcusd' ||
    String(text).toLocaleLowerCase() === '/ltceur' ||
    String(text).toLocaleLowerCase() === '/solusd' ||
    String(text).toLocaleLowerCase() === '/xrpusd' ||
    String(text).toLocaleLowerCase() === '/adausd' ||
    String(text).toLocaleLowerCase() === '/eosusd' ||
    String(text).toLocaleLowerCase() === '/aptusd' ||
    String(text).toLocaleLowerCase() === '/filusd'
  ) {
    bfHttpRequest(bot, chatId, text);
  } else if (text === '/secret') {
    secret(bot, chatId);
  } else if (String(text).toLocaleLowerCase().includes('/timer')) {
    timer(bot, chatId, text);
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
    tmrMsg(bot, chatId);
  } else if (text.includes('/timer')) {
    timer(bot, chatId, text);
  } else if (text === '/btcBlockInfo') {
    btcBlockInfo(bot, chatId);
  } else {
    bfHttpRequest(bot, chatId, text);
  }
  stat(bot, msg);
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
