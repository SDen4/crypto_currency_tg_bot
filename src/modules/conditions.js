import { cndtnFunc } from '../utils/cndtnFunc.js';
import { statChatId, shortSign, eugPartId } from '../../token.js';
import { checkAddrBtns, tgStarsCallbackData } from './buttons.js';

export const cndtnCurrencies = (text) =>
  [
    'ada',
    'adausd',
    'algo',
    'algusd',
    'apeusd',
    'apt',
    'aptusd',
    'avax:usd',
    'avax',
    'axs',
    'axsusd',
    'bchn:usd',
    'bchn',
    'bit coin',
    'bitcoin',
    'bsvusd',
    'btc',
    'btceur',
    'btcusd',
    'clo',
    'clousd',
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
    'ethw:usd',
    'ethw',
    'eur',
    'eurt',
    'euteur',
    'fil',
    'filusd',
    'ftm',
    'ftm',
    'ftmusd',
    'gala:usd',
    'gala',
    'hi',
    'hixusd',
    'iota',
    'iotusd',
    'leo',
    'leousd',
    'link:usd',
    'link',
    'ltc',
    'ltceur',
    'ltcusd',
    'matic:usd',
    'matic',
    'neo',
    'neousd',
    'not',
    'omg',
    'paxusd',
    'pepe',
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
    'xaut:usd',
    'xaut',
    'xcnusd',
    'xdc',
    'xlmusd',
    'xmrusd',
    'xrpusd',
    'xtzusd',
    'yfiusd',
  ].includes(cndtnFunc(String(text).replace('/', '')));

export const cndtnInfo = (text) =>
  ['menu', 'info', 'штащ', 'help', 'рудз', 'инфо'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

export const cndtnCurrenciesBtns = (text) =>
  ['currencies', 'сгккутсшуы', 'curr', 'сгкк', 'cur', 'сгк'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

export const cndtnSecret = (text) =>
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
  ].includes(cndtnFunc(String(text).replace('/', '')));

export const cndtnStart = (text) =>
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
  ].includes(cndtnFunc(String(text).replace('/', '')));

export const cndtnBtcBlockInfo = (text) =>
  ['btcblockinfo', 'btcblocksinfo', 'btcblock', 'blockinfo', 'block'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

export const cndtnBtcBlockInfoRefresh = (text) =>
  text === '/btcblockinfoRefresh';

export const cndtnPool = (text) => {
  const formatText = String(text).trim()[0] / 2;
  return typeof formatText === 'number' && !isNaN(formatText);
};

export const cndtnStatistic = (t, msg) => {
  const reader = msg.from.id === statChatId;
  const text = String(t)?.toLocaleLowerCase().match(/\D+/g)?.[0].trim();

  return ['stat', '/stat', 'стат'].includes(text) && reader;
};

export const cndtnStatisticQuantity = (t, msg) => {
  const reader = msg.from.id === statChatId;
  const isRigthCommand = String(t)?.toLocaleLowerCase() === 'usersquantity';

  return isRigthCommand && reader;
};

export const cndtnBanUser = (t, msg) => {
  return t.toLowerCase() === 'banuser' && msg.from.id === statChatId;
};

export const cndtnUnbanUser = (t, msg) => {
  return t.toLowerCase() === 'unbanuser' && msg.from.id === statChatId;
};

export const cndtnStatisticUsers = (t, msg) => {
  return t?.toLowerCase() === 'users' && msg.from.id === statChatId;
};

export const cndtnEugFunc = (text, msg) => {
  const id = msg.from.id;

  return (
    text?.toLocaleLowerCase() === shortSign &&
    (String(id).indexOf(eugPartId) !== -1 || id === statChatId)
  );
};

export const cndtnEmoji = (text) =>
  typeof Number(text) !== 'number' && /\p{Emoji}/u.test(text);

export const cndtnDonate = (text) => {
  return (
    text === '/copyAddressBTC' ||
    text === '/copyAddressETH' ||
    text === '/copyAddressDoge' ||
    text === '/copyAddressLightning'
  );
};

export const cndtnTgStarDonate = (text) => text === '/sendTelegramStarInvoice';

export const cndtnDonateQr = (text) => {
  return text === '/showQrBtc' || text === '/showQrLightning';
};

export const cndtnCheckAddress = (text) => {
  return checkAddrBtns.map((el) => el.callback_data).includes(text);
};

export const cndtnTgStarDonateBtn = (text) =>
  tgStarsCallbackData.includes(text);

export const cndtnThankAfterDonate = (msg) => {
  return msg?.text === undefined && msg?.successful_payment?.total_amount > 0;
};

export const cndtnCryptoInfo = (t) =>
  t.toLowerCase() === '/cryptoinfo' ||
  [
    "what's crypto",
    'what is crypto?',
    'what is crypto',
    'crypto currency',
    'i am beginner',
  ].includes(t.toLowerCase());
