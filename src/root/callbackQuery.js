import {
  donateBtcAddress,
  donateEthAddress,
  donateDogeAddress,
  statChatId,
} from '../../token.js';

import { ban } from '../utils/ban.js';

import { checkBannedUsers } from '../api/checkBannedUsers.js';
import { bfHttpRequest } from '../api/bfHttpRequest.js';
import { getUsers } from '../api/getUsers.js';
import { getVisits } from '../api/getVisits.js';
import { getUsersQuantity } from '../api/getUsersQuantity.js';
import { getUnicUsersChart } from '../api/getUnicUsersChart.js';
import { getChatCurValue } from '../api/getChatCurValue.js';

import { btcBlockInfo } from '../modules/btcBlockInfo.js';
import { timer } from '../modules/timer.js';
import { getChart } from '../modules/charts.js';
import { sendErrorMessage } from '../modules/messages.js';

import {
  saveStat,
  unicUsersByDates,
  unicUsersChart,
  visitors,
} from '../statistic/index.js';

import {
  cndtnCurrenciesBtns,
  cndtnBtcBlockInfo,
  cndtnBtcBlockInfoRefresh,
  cndtnCurrencyRefresh,
  cndtnStatistic,
  cndtnStatisticQuantity,
  cndtnStatisticUsers,
  cndtnDonate,
  cndtnTgStarDonate,
  cndtnTgStarDonateBtn,
  cndtnDonateQr,
  cndtnCheckAddress,
  cndtnBanUser,
  cndtnUnbanUser,
  cndtnCheckMyDonateAddresses,
  cndtnCryptoInfo,
} from '../modules/conditions.js';
import {
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
  checkAddressMsg,
  sendBannedUserIdMsg,
  sendCryptoInfoMsg,
  balanceMsg,
} from '../modules/messages.js';

export const callbackQuery = async (
  bot,
  msg,
  checkAddressMode,
  selectedCurrency,
  isBanUser,
  isUnbanUser,
) => {
  const chatId = msg?.message?.chat?.id;
  const text = msg?.data;

  const isBannedUser = await checkBannedUsers(bot, chatId);
  if (isBannedUser) return null;
  if (ban(bot, chatId, msg)) return null;

  await saveStat(bot, msg);

  // Charts
  if (text === '/charts') {
    await sendChartCurBtns(bot, chatId);
  }
  // set charts
  else if (text.includes('_set_chart')) {
    const curValue = await getChatCurValue(bot, text);
    await getChart(bot, chatId, text, msg, curValue);
  }
  // All Currencies
  else if (cndtnCurrenciesBtns(text)) {
    await allCurrencies(bot, chatId);
  }
  // BTC Block Info
  else if (cndtnBtcBlockInfo(text)) {
    await btcBlockInfo(bot, chatId);
  }
  // BTC Block Info (REFRESH)
  else if (cndtnBtcBlockInfoRefresh(text)) {
    await btcBlockInfo(bot, chatId, true);
  }
  // BTC Block Info (DELETE)
  else if (text === '/btcblockinfoDelete') {
    await btcBlockInfo(bot, chatId, null, true);
  }
  // Currency (REFRESH)
  else if (cndtnCurrencyRefresh(text)) {
    const textRequest = text.slice(0, -16);
    await bfHttpRequest(bot, chatId, textRequest, msg, true);
  }
  // Currency (DELETE)
  else if (text === '/currencyInfoDelete') {
    await bfHttpRequest(bot, chatId, null, null, null, true);
  }
  // check the address
  else if (cndtnCheckAddress(text)) {
    await checkAddressMsg(bot, chatId);
    checkAddressMode.x = text.slice(13);
  }
  // Timer
  else if (text === '/settimer') {
    await setTmrMsgCur(bot, chatId);
  } else if (text.includes('_set_timer')) {
    selectedCurrency.x = String(text).slice(0, 7);
    await setTmrMsgTime(bot, chatId);
  }
  // Donate
  else if (text === '/donate') {
    await donate(bot, chatId);
  } else if (cndtnDonateQr(text)) {
    await showQr(bot, chatId, text);
  } else if (cndtnDonate(text)) {
    await copyDonateAddress(bot, chatId, text, msg);
  } else if (cndtnTgStarDonate(text)) {
    await sendTgStarInvoiceBtns(bot, chatId, text, msg);
  } else if (cndtnTgStarDonateBtn(text)) {
    await sendTgStarInvoice(bot, chatId, text);
  }
  // Timer
  else if (text.includes('/timer')) {
    await timer(bot, chatId, text, selectedCurrency.x);
  }
  // Calculate Pool
  else if (text === '/pool') {
    await poolMsg(bot, chatId);
  }
  // Statistic (Users)
  else if (cndtnStatisticUsers(text, msg)) {
    const stat = await getUsers(bot);
    await statisticUsersMsg(bot, chatId, stat);
  }
  // Statistic (visits 10)
  else if (cndtnStatistic(text, msg)) {
    const stat = await getVisits(bot);
    await statisticMsg(bot, chatId, stat, 10);
  }
  // Statistic (unique visitors quantity)
  else if (cndtnStatisticQuantity(text, msg)) {
    const usersQuantity = await getUsersQuantity(bot);
    await bot.sendMessage(chatId, `Total: ${usersQuantity} unique visitors`);
  }
  // Statistic (Unic Users Chart)
  else if (text === 'unicuserschart') {
    const chartData = await getUnicUsersChart(bot);
    await unicUsersChart(bot, chatId, chartData);
  }
  // Statistic (Unic Users By Dates)
  else if (text === 'unicusersbydates') {
    const chartData = await getUnicUsersChart(bot, true);
    await unicUsersByDates(bot, chatId, chartData);
  }
  // Ban user (message: send Id)
  else if (cndtnBanUser(text, msg)) {
    await sendBannedUserIdMsg(bot, chatId, 'banned');
    isBanUser.x = true;
  }
  // Unban user (message: send Id)
  else if (cndtnUnbanUser(text, msg)) {
    await sendBannedUserIdMsg(bot, chatId, 'unbanned');
    isUnbanUser.x = true;
  }
  // Check my BTC donate address
  else if (cndtnCheckMyDonateAddresses(text, msg, 'checkMyBtcDonateAddress')) {
    await balanceMsg(bot, statChatId, 'bitcoin', donateBtcAddress, true);
  }
  // Check my ETH donate address
  else if (cndtnCheckMyDonateAddresses(text, msg, 'checkMyEthDonateAddress')) {
    await balanceMsg(bot, statChatId, 'ethcoin', donateEthAddress, true);
  }
  // Check my DOGE donate address
  else if (cndtnCheckMyDonateAddresses(text, msg, 'checkMyDogeDonateAddress')) {
    await balanceMsg(bot, statChatId, 'dogecoin', donateDogeAddress, true);
  }
  // crypto info
  else if (cndtnCryptoInfo(text)) {
    await sendCryptoInfoMsg(bot, chatId, msg);
  }
  // Currencies
  else {
    await bfHttpRequest(bot, chatId, text, msg);
  }

  await bot
    .answerCallbackQuery(msg.id)
    .catch((error) => sendErrorMessage(error, bot, statChatId));

  await visitors(bot, msg);
};
