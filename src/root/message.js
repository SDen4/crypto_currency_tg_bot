import { ban } from '../utils/ban.js';
import { cndtnFunc } from '../utils/cndtnFunc.js';
import { convertShortCommands } from '../utils/convertShortCommands.js';

import { bfHttpRequest } from '../api/bfHttpRequest.js';
import { getUsers } from '../api/getUsers.js';
import { getVisits } from '../api/getVisits.js';
import { changeBannedUser } from '../api/changeBannedUser.js';
import { checkBannedUsers } from '../api/checkBannedUsers.js';

import { btcBlockInfo } from '../modules/btcBlockInfo.js';
import { timer } from '../modules/timer.js';
import { pool } from '../modules/pool.js';

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
  cndtnThankAfterDonate,
  cndtnCryptoInfo,
} from '../modules/conditions.js';
import {
  unkCmd,
  start,
  menu,
  secret,
  allCurrencies,
  poolMsg,
  statisticMsg,
  statisticUsersMsg,
  emojiMsg,
  sendCryptoInfoMsg,
  thankDonateStarMsg,
  balanceMsg,
} from '../modules/messages.js';

import { visitors, saveStat } from '../statistic/index.js';

export const message = async (
  bot,
  msg,
  selectedCurrency,
  checkAddressMode,
  isBanUser,
  isUnbanUser,
) => {
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  await saveStat(bot, msg);

  const isBannedUser = await checkBannedUsers(bot, chatId);
  if (isBannedUser) return null;
  if (ban(bot, chatId, msg)) return null;

  // Start
  if (cndtnStart(text)) {
    await start(bot, chatId, msg);
  }
  // check the address
  else if (checkAddressMode.x) {
    await balanceMsg(bot, chatId, checkAddressMode.x, msg.text);
    checkAddressMode.x = null;
  }
  // Ban user
  else if (isBanUser.x && !isNaN(Number(text))) {
    await changeBannedUser(bot, chatId, msg, true);
    isBanUser.x = false;
  }
  // Unban user
  else if (isUnbanUser.x && !isNaN(Number(text))) {
    await changeBannedUser(bot, chatId, msg, false);
    isUnbanUser.x = false;
  }
  // Menu
  else if (cndtnInfo(text)) {
    await menu(bot, chatId, msg);
  }
  // All Currencies
  else if (cndtnCurrenciesBtns(text)) {
    await allCurrencies(bot, chatId);
  }
  // BTC Block Info
  else if (cndtnBtcBlockInfo(text)) {
    await btcBlockInfo(bot, chatId, msg);
  }
  // Timer
  else if (cndtnFunc(text).includes('/timer')) {
    await timer(bot, chatId, text, selectedCurrency.x);
    selectedCurrency.x = '';
  }
  // Calculate Pool
  else if (cndtnPool(text)) {
    await pool(bot, chatId, text);
  } else if (text === '/pool') {
    await poolMsg(bot, chatId);
  }
  // Eug function
  else if (cndtnEugFunc(text, msg)) {
    await Promise.all([
      bfHttpRequest(bot, chatId, '/btcusd', msg),
      btcBlockInfo(bot, chatId, msg),
    ]);
  }
  // Short commands (currencies)
  else if (cndtnCurrencies(text)) {
    const formatText = await convertShortCommands(text);
    await bfHttpRequest(bot, chatId, formatText, msg);
  }
  // Statistic
  else if (cndtnStatistic(text, msg)) {
    const quant = Number(String(text).match(/\d+/g)?.[0]) || 10;
    const stat = await getVisits(bot);
    await statisticMsg(bot, chatId, stat, quant);
  } else if (cndtnStatisticUsers(text, msg)) {
    const stat = await getUsers(bot);
    await statisticUsersMsg(bot, chatId, stat);
  }
  // Secret
  else if (cndtnSecret(text)) {
    await secret(bot, chatId);
  }
  // thaks after telegram stars donate
  else if (cndtnThankAfterDonate(msg)) {
    await thankDonateStarMsg(bot, msg);
  }
  // crypto info
  else if (cndtnCryptoInfo(text)) {
    await sendCryptoInfoMsg(bot, chatId, msg);
  }
  // Emoji messages
  else if (cndtnEmoji(text)) {
    await emojiMsg(text, bot, chatId);
  }
  // Unknown command
  else {
    await unkCmd(bot, chatId);
  }

  await visitors(bot, msg);
};
