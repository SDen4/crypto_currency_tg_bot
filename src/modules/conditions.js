import { cndtnFunc } from '../utils/cndtnFunc.js';

import { checkAddrBtns, tgStarsCallbackData } from './buttons.js';

const eugPartId = process.env.EUG_PART_ID.split(',').map(String);
const shortSign = process.env.SHORT_SIGN;
const statChatId = String(process.env.STAT_CHAT_ID);

export const cndtnCurrencies = (t) =>
  [
    'ada',
    'adausd',
    'algo',
    'algusd',
    'apeusd',
    'apt',
    'aptusd',
    'atom',
    'atousd',
    'avax:usd',
    'avax',
    'bchn:usd',
    'bchn',
    'bit coin',
    'bitcoin',
    'btc',
    'btceur',
    'btcusd',
    'chz',
    'chzusd',
    'dash',
    'doge:usd',
    'doge',
    'dot',
    'dotusd',
    'dshusd',
    'dym',
    'eos',
    'eosusd',
    'etc',
    'eth',
    'etheur',
    'ethusd',
    'eur',
    'fil',
    'filusd',
    'gala:usd',
    'gala',
    'gtx',
    'gtxusd',
    'iota',
    'iotusd',
    'leo',
    'leousd',
    'link:usd',
    'link',
    'ltc',
    'ltceur',
    'ltcusd',
    'neo',
    'neousd',
    'omni',
    'omnusd',
    'pepe',
    'pnk',
    'pnkusd',
    'rrt',
    'rrtusd',
    'solusd',
    'sushi:usd',
    'ton',
    'trx',
    'trxusd',
    'udcusd',
    'uniusd',
    'usd',
    'usdc',
    'usdt',
    'ustusd',
    'wbtc',
    'wbtusd',
    'xaut:usd',
    'xaut',
    'xdc',
    'xlmusd',
    'xmrusd',
    'xrpusd',
    'xtzusd',
    'zec',
    'zecusd',
  ].includes(cndtnFunc(String(t).replace('/', '')));

export const cndtnInfo = (t) =>
  ['menu', 'info', 'штащ', 'help', 'рудз', 'инфо'].includes(
    cndtnFunc(String(t).replace('/', '')),
  );

export const cndtnCurrenciesBtns = (t) =>
  ['currencies', 'сгккутсшуы', 'curr', 'сгкк', 'cur', 'сгк'].includes(
    cndtnFunc(String(t).replace('/', '')),
  );

export const cndtnSecret = (t) =>
  [
    'secret',
    'ыускуе',
    'secr',
    'ыуск',
    'good boy',
    'good bot',
    'great',
    'excelent',
    'cool',
  ].includes(cndtnFunc(String(t).replace('/', '')));

export const cndtnStart = (t) =>
  [
    'start',
    'ыефке',
    'старт',
    'hello',
    'hey',
    'ghbdtn',
    'привет',
    'привте',
    'превет',
    'превед',
    'yo',
    'хай',
  ].includes(cndtnFunc(String(t).replace('/', '')));

export const cndtnBtcBlockInfo = (t) =>
  ['btcblockinfo', 'btcblocksinfo', 'btcblock', 'blockinfo', 'block'].includes(
    cndtnFunc(String(t).replace('/', '')),
  );

export const cndtnPool = (t) => {
  const formatText = String(t).trim()[0] / 2;
  return typeof formatText === 'number' && !isNaN(formatText);
};

export const cndtnStatistic = (t, msg) => {
  const reader = String(msg.from.id) === statChatId;
  const text = String(t)?.toLowerCase().match(/\D+/g)?.[0].trim();

  return ['stat', '/stat', 'стат'].includes(text) && reader;
};

export const cndtnStatisticQuantity = (t, msg) =>
  String(msg.from.id) === statChatId && t === 'usersquantity';

export const cndtnBanUser = (t, msg) =>
  t?.toLowerCase() === 'banuser' && String(msg.from.id) === statChatId;

export const cndtnUnbanUser = (t, msg) =>
  t?.toLowerCase() === 'unbanuser' && String(msg.from.id) === statChatId;

export const cndtnStatisticUsers = (t, msg) =>
  t?.toLowerCase() === 'users' && String(msg.from.id) === statChatId;

export const cndtnEugFunc = (t, msg) => {
  const id = String(msg.from.id);

  return (
    t?.toLowerCase() === shortSign && [...eugPartId, statChatId].includes(id)
  );
};

export const cndtnEmoji = (t) =>
  typeof Number(t) !== 'number' && /\p{Emoji}/u.test(t);

export const cndtnDonate = (t) => {
  return (
    t === '/copyAddressBTC' ||
    t === '/copyAddressETH' ||
    t === '/copyAddressDoge' ||
    t === '/copyAddressLightning'
  );
};

export const cndtnTgStarDonate = (t) => t === '/sendTelegramStarInvoice';

export const cndtnDonateQr = (t) =>
  t === '/showQrBtc' || t === '/showQrLightning';

export const cndtnCheckAddress = (t) =>
  checkAddrBtns.map((el) => el.callback_data).includes(t);

export const cndtnTgStarDonateBtn = (t) => tgStarsCallbackData.includes(t);

export const cndtnThankAfterDonate = (msg) =>
  msg?.text === undefined && msg?.successful_payment?.total_amount > 0;

export const cndtnCryptoInfo = (t) =>
  t?.toLowerCase() === '/cryptoinfo' ||
  [
    "what's crypto",
    'what is crypto?',
    'what is crypto',
    'crypto currency',
    'i am beginner',
  ].includes(t?.toLowerCase());

// check my addresses
export const cndtnCheckMyAddresses = (t, msg) =>
  String(msg.from.id) === statChatId && t === 'checkMyDonateAddresses';

export const cndtnCheckMyDonateAddresses = (t, msg, command) => {
  const reader = String(msg.from.id) === statChatId;
  const isRightCommand = String(t) === command;

  return isRightCommand && reader;
};

// all users
export const cndtnMessageAllUsersFlag = (t, msg) =>
  t === 'messageAllUsers' && String(msg.from.id) === statChatId;
export const cndtnMessageAllUsers = (flag, msg) =>
  flag && String(msg.from.id) === statChatId;

// fiat
export const cndtnFiatPairCurrencies = (t) => t.includes('fiat-pair-');
export const cndtnFiatAllCurrencies = (t) => t.includes('fiat-all-');

export const cndtnFiatRest = (t, chatId) =>
  String(chatId) === statChatId && t.includes('checkTheRestOfFiatRequests');

export const cndtnAllFiatBtns = (t, chatId) =>
  String(chatId) === statChatId && t.includes('showAllFiatButtons');

export const cndtnChangeLimitOfFiatMessage = (t, chatId) =>
  String(chatId) === statChatId &&
  t.includes('changeLimitOfFiatRequestsMessage');

export const cndtnChangeLimitOfFiat = (t, chatId) =>
  String(chatId) === statChatId && t.includes('changeLimitOfFiatRequests-');

export const cndtnResetFiatDayRequestsMessage = (t, chatId) =>
  String(chatId) === statChatId && t.includes('resetFiatDayRequestMessage');

export const cndtnResetFiatDayRequests = (t, chatId) =>
  String(chatId) === statChatId && t.includes('resetFiatDayRequests-');

export const cndtnHistoryOfFiatRates = (t) => t.includes('fiatHistoryRates-');
