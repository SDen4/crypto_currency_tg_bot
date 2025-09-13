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
import { getFiatRest } from '../api/getFiatRest.js';

import { fiat } from '../modules/fiat.js';
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
  cndtnMessageAllUsersFlag,
  cndtnFiatPairCurrencies,
  cndtnFiatAllCurrencies,
  cndtnFiatRest,
  cndtnChangeLimitOfFiatMessage,
  cndtnCurrenciesBtns,
  cndtnBtcBlockInfo,
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
  fiatCurrencies,
  poolMsg,
  statisticMsg,
  statisticUsersMsg,
  checkAddressMsg,
  sendBannedUserIdMsg,
  sendCryptoInfoMsg,
  balanceMsg,
  changeLimitOfFiatRequestsMessage,
} from '../modules/messages.js';

export const callbackQuery = async (bot, msg, state) => {
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
    await btcBlockInfo(bot, chatId, msg);
  }
  // BTC Block Info (REFRESH)
  else if (text.includes('/btcblockinfoRefresh')) {
    const responseArr = text.split('_');
    const msgId = responseArr[1];

    await btcBlockInfo(bot, chatId, msg, msgId);
  }
  // BTC Block Info (DELETE)
  else if (text.includes('/btcblockinfoDelete')) {
    const responseArr = text.split('_');
    const msgId = responseArr[1];

    await btcBlockInfo(bot, chatId, msg, null, msgId);
  }
  // Currency (REFRESH)
  else if (text.includes('currencyRefresh')) {
    const responseArr = text.split('_');
    const textRequest = responseArr[0];
    const msgId = responseArr[2];

    await bfHttpRequest(bot, chatId, textRequest, msg, msgId);
  }
  // Currency (DELETE)
  else if (text.includes('/currencyInfoDelete')) {
    const responseArr = text.split('_');
    const msgId = responseArr[1];

    await bfHttpRequest(bot, chatId, null, msg, null, msgId);
  }
  // check the address
  else if (cndtnCheckAddress(text)) {
    await checkAddressMsg(bot, chatId);
    state.checkAddressMode = text.slice(13);
  }
  // Timer
  else if (text === '/settimer') {
    await setTmrMsgCur(bot, chatId);
  } else if (text.includes('_set_timer')) {
    state.selectedCurrency = String(text).slice(0, 7);
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
    await timer(bot, chatId, text, state.selectedCurrency);
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
    state.isBanUser = true;
  }
  // Unban user (message: send Id)
  else if (cndtnUnbanUser(text, msg)) {
    await sendBannedUserIdMsg(bot, chatId, 'unbanned');
    state.isUnbanUser = true;
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
  // message all users (set flag)
  else if (cndtnMessageAllUsersFlag(text, msg)) {
    state.isMessageAllUsersMode = true;
    await bot.sendMessage(chatId, 'Type the message and send it');
  }

  // fiat currencies menu
  else if (text === '/fiatcurrencies') {
    await fiatCurrencies(bot, chatId);
  }
  // fiat pair rates requests
  else if (cndtnFiatPairCurrencies(text)) {
    await fiat(bot, chatId, text, msg, 'pair');
  }
  // fiat all rates by base currency requests
  else if (cndtnFiatAllCurrencies(text)) {
    await fiat(bot, chatId, text, msg, 'all');
  }
  // check the rest of fiat requests
  else if (cndtnFiatRest(text, chatId)) {
    await getFiatRest(bot);
  }
  // MESSAGE change limit of fiat requests for user
  else if (cndtnChangeLimitOfFiatMessage(text, chatId)) {
    await changeLimitOfFiatRequestsMessage(bot);
  }

  // Currencies
  else {
    await bfHttpRequest(bot, chatId, text, msg);
  }

  if (msg?.id) {
    await bot
      .answerCallbackQuery(msg.id, { cache_time: 1 })
      .catch((error) => sendErrorMessage(error, bot, statChatId));
  }

  await visitors(bot, msg);
};
