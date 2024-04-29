import TgBotApi from 'node-telegram-bot-api';

import { token } from './token.js';

const bot = new TgBotApi(token, { polling: true });

import { ban } from './src/utils/ban.js';
import { cndtnFunc } from './src/utils/cndtnFunc.js';
import { bfHttpRequest } from './src/api/bfHttpRequest.js';
import { btcBlockInfo } from './src/modules/btcBlockInfo.js';
import { timer } from './src/modules/timer.js';
import { pool } from './src/modules/pool.js';
import { visitors } from './src/statistic/visitors.js';
import { saveStat, getStat } from './src/statistic/statistic.js';
import { convertShortCommands } from './src/modules/convertShortCommands.js';
import { commands } from './src/modules/buttons.js';
import { getCharts } from './src/modules/charts.js';
import {
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
} from './src/modules/conditions.js';
import {
  unkCmd,
  start,
  info,
  secret,
  setTmrMsgCur,
  setChartCur,
  donate,
  showQr,
  copyBtcAddress,
  setTmrMsgTime,
  allCurrencies,
  poolMsg,
  statisticMsg,
  emojiMsg,
} from './src/modules/messages.js';
import { percentAlertMessage } from './src/modules/percentAlertMessage.js';

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

  if (text === '/charts') {
    setChartCur(bot, chatId);
  } else if (text === '/settimer') {
    setTmrMsgCur(bot, chatId);
  } else if (text === '/donate') {
    donate(bot, chatId);
  } else if (text === '/showQr') {
    showQr(bot, chatId);
  } else if (text === '/copyBtcAddress') {
    copyBtcAddress(bot, chatId);
  } else if (text.includes('_set_chart')) {
    selectedCurrency = String(text).slice(0, 7);
    getCharts(bot, chatId, selectedCurrency);
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
