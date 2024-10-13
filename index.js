import TgBotApi from 'node-telegram-bot-api';

import { token } from './token.js';

const bot = new TgBotApi(token, { polling: true });

import { ban } from './src/utils/ban.js';
import { cndtnFunc } from './src/utils/cndtnFunc.js';
import { bfHttpRequest } from './src/api/bfHttpRequest.js';
import { getUsers } from './src/api/getUsers.js';
import { getVisits } from './src/api/getVisits.js';
import { getAddressInfo } from './src/api/getAddressInfo.js';
import { getChatCurValue } from './src/api/getChatCurValue.js';
import { btcBlockInfo } from './src/modules/btcBlockInfo.js';
import { changeBannedUser } from './src/api/changeBannedUser.js';
import { checkBannedUsers } from './src/api/checkBannedUsers.js';
import { timer } from './src/modules/timer.js';
import { pool } from './src/modules/pool.js';
import { visitors } from './src/statistic/visitors.js';
import { saveStat } from './src/statistic/statistic.js';
import { convertShortCommands } from './src/modules/convertShortCommands.js';
import { commands } from './src/modules/buttons.js';
import { getChart } from './src/modules/charts.js';
import {
  cndtnCurrencies,
  cndtnInfo,
  cndtnCurrenciesBtns,
  cndtnSecret,
  cndtnStart,
  cndtnBtcBlockInfo,
  cndtnPool,
  cndtnStatistic,
  cndtnStatisticUsers,
  cndtnEugFunc,
  cndtnEmoji,
  cndtnDonate,
  cndtnTgStarDonate,
  cndtnTgStarDonateBtn,
  cndtnDonateQr,
  cndtnCheckAddress,
  cndtnBanUser,
  cndtnUnbanUser,
  cndtnThankAfterDonate,
} from './src/modules/conditions.js';
import {
  unkCmd,
  start,
  menu,
  secret,
  setTmrMsgCur,
  sendChartCurBtns,
  donate,
  showQr,
  copyDonateAddress,
  sendTgStarInvoice,
  sendTgStarInvoiceBtns,
  setTmrMsgTime,
  allCurrencies,
  poolMsg,
  statisticMsg,
  statisticUsersMsg,
  emojiMsg,
  checkAddressMsg,
  sendBannedUserIdMsg,
  thankDonateStarMsg,
} from './src/modules/messages.js';
import { percentAlertMessage } from './src/modules/percentAlertMessage.js';

let selectedCurrency = '';
let checkAddressMode = null;
let isBanUser = false;
let isUnbanUser = false;

bot.setMyCommands(commands);
percentAlertMessage(bot);

const messageFunc = async (msg) => {
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  saveStat(msg);

  const isBannedUser = await checkBannedUsers(bot, chatId);
  if (isBannedUser) return null;
  if (ban(bot, chatId, msg)) return null;

  // Start
  if (cndtnStart(text)) {
    start(bot, chatId, msg);
  }
  // check the address
  else if (checkAddressMode) {
    await getAddressInfo(bot, chatId, msg, checkAddressMode);
    checkAddressMode = null;
  }
  // Ban user
  else if (isBanUser && !isNaN(Number(text))) {
    await changeBannedUser(bot, chatId, msg, true);
    isBanUser = false;
  }
  // Unban user
  else if (isUnbanUser && !isNaN(Number(text))) {
    await changeBannedUser(bot, chatId, msg, false);
    isUnbanUser = false;
  }
  // Menu
  else if (cndtnInfo(text)) {
    menu(bot, chatId, msg);
  }
  // Short commands
  else if (cndtnCurrencies(text)) {
    const formatText = convertShortCommands(text);
    bfHttpRequest(bot, chatId, formatText);
  }
  // Secret
  else if (cndtnSecret(text)) {
    secret(bot, chatId);
  }
  // Timer
  else if (cndtnFunc(text).includes('/timer')) {
    timer(bot, chatId, text, selectedCurrency);
    selectedCurrency = '';
  }
  // BTC Block Info
  else if (cndtnBtcBlockInfo(text)) {
    btcBlockInfo(bot, chatId);
  }
  // All Currencies
  else if (cndtnCurrenciesBtns(text)) {
    allCurrencies(bot, chatId);
  }
  // Calculate Pool
  else if (cndtnPool(text)) {
    pool(bot, chatId, text);
  } else if (text === '/pool') {
    poolMsg(bot, chatId);
  }
  // Statistic
  else if (cndtnStatistic(text, msg)) {
    const quant = Number(String(text).match(/\d+/g)?.[0]) || 10;
    const stat = await getVisits();
    await statisticMsg(bot, chatId, stat, quant);
  } else if (cndtnStatisticUsers(text, msg)) {
    const stat = await getUsers();
    await statisticUsersMsg(bot, chatId, stat);
  }
  // Eug function
  else if (cndtnEugFunc(text, msg)) {
    await Promise.all([
      bfHttpRequest(bot, chatId, '/btcusd'),
      btcBlockInfo(bot, chatId),
    ]);
  }
  // Emoji messages
  else if (cndtnEmoji(text)) {
    emojiMsg(text, bot, chatId);
  }
  // thaks after telegram stars donate
  else if (cndtnThankAfterDonate(msg)) {
    thankDonateStarMsg(bot, msg);
  }
  // Unknown command
  else {
    unkCmd(bot, chatId);
  }

  visitors(bot, msg);
};

const buttonsFunc = async (msg) => {
  const chatId = msg?.message?.chat?.id;
  const text = msg?.data;

  saveStat(msg);

  const isBannedUser = await checkBannedUsers(bot, chatId);
  if (isBannedUser) return null;
  if (ban(bot, chatId, msg)) return null;

  // Charts
  if (text === '/charts') {
    sendChartCurBtns(bot, chatId);
  } else if (text.includes('_set_chart')) {
    const curValue = await getChatCurValue(text);
    await getChart(bot, chatId, text, msg, curValue);
  }
  // check the address
  else if (cndtnCheckAddress(text)) {
    checkAddressMsg(bot, chatId);
    checkAddressMode = text.slice(13);
  }
  // Timer
  else if (text === '/settimer') {
    setTmrMsgCur(bot, chatId);
  } else if (text.includes('_set_timer')) {
    selectedCurrency = String(text).slice(0, 7);
    setTmrMsgTime(bot, chatId);
  }
  // Donate
  else if (text === '/donate') {
    donate(bot, chatId);
  } else if (cndtnDonateQr(text)) {
    showQr(bot, chatId, text);
  } else if (cndtnDonate(text)) {
    copyDonateAddress(bot, chatId, text, msg);
  } else if (cndtnTgStarDonate(text)) {
    sendTgStarInvoiceBtns(bot, chatId, text, msg);
  } else if (cndtnTgStarDonateBtn(text)) {
    sendTgStarInvoice(bot, chatId, text);
  }
  // All Currencies
  else if (cndtnCurrenciesBtns(text)) {
    allCurrencies(bot, chatId);
  }
  // Timer
  else if (text.includes('/timer')) {
    timer(bot, chatId, text, selectedCurrency);
  }
  // BTC Block Info
  else if (cndtnBtcBlockInfo(text)) {
    btcBlockInfo(bot, chatId);
  }
  // Calculate Pool
  else if (text === '/pool') {
    poolMsg(bot, chatId);
  }
  // Statistic (Users)
  else if (cndtnStatisticUsers(text, msg)) {
    const stat = await getUsers();
    await statisticUsersMsg(bot, chatId, stat);
  }
  // Statistic (visits 10)
  else if (cndtnStatistic(text, msg)) {
    const stat = await getVisits();
    await statisticMsg(bot, chatId, stat, 10);
  }
  // Ban user (message: send Id)
  else if (cndtnBanUser(text, msg)) {
    await sendBannedUserIdMsg(bot, chatId, 'banned');
    isBanUser = true;
  }
  // Unban user (message: send Id)
  else if (cndtnUnbanUser(text, msg)) {
    await sendBannedUserIdMsg(bot, chatId, 'unbanned');
    isUnbanUser = true;
  }
  // Currencies
  else {
    bfHttpRequest(bot, chatId, text, msg);
  }

  await bot.answerCallbackQuery(msg.id);
  visitors(bot, msg);
};

const answerPreCheckoutQuery = async (query) => {
  await bot.answerPreCheckoutQuery(String(query.id), true);
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
bot.on('pre_checkout_query', answerPreCheckoutQuery);
