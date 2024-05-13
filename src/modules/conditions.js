import { cndtnFunc } from '../utils/cndtnFunc.js';
import { statChatId, shortSign, eugPartId } from '../../token.js';

export const cndtnCurrencies = (text) =>
  [
    'btc',
    'eth',
    'usd',
    'eur',
    'eurt',
    'usdt',
    'usdc',
    'doge',
    'ada',
    'algo',
    'apt',
    'avax',
    'axs',
    'bchn',
    'clo',
    'dash',
    'dot',
    'eos',
    'etc',
    'fil',
    'gala',
    'hi',
    'iota',
    'leo',
    'link',
    'ltc',
    'ton',
    'matic',
    'btcusd',
    'btceur',
    'ethusd',
    'etheur',
    'euteur',
    'ltcusd',
    'ltceur',
    'solusd',
    'adausd',
    'eosusd',
    'aptusd',
    'filusd',
    'ustusd',
    'doge:usd',
    'matic:usd',
    'sushi:usd',
    'link:usd',
    'avax:usd',
    'axsusd',
    'dotusd',
    'bchn:usd',
    'udcusd',
    'iotusd',
    'trxusd',
    'uniusd',
    'gala:usd',
    'leousd',
    'paxusd',
    'algusd',
    'clousd',
    'dshusd',
    'hixusd',
    'xcnusd',
    'xaut:usd',
    'xaut',
    'xlmusd',
    'xmrusd',
    'xrpusd',
    'xtzusd',
    'apeusd',
    'bsvusd',
    'yfiusd',
    'neousd',
    'neo',
    'ftmusd',
    'ftm',
    'ethw',
    'ethw:usd',
  ].includes(cndtnFunc(String(text).replace('/', '')));

export const cndtnInfo = (text) =>
  ['info', 'штащ', 'help', 'рудз', 'инфо'].includes(
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
  ].includes(cndtnFunc(String(text).replace('/', '')));

export const cndtnStart = (text) =>
  [
    'start',
    'ыефке',
    'старт',
    'begin',
    'hello',
    'hey',
    'привет',
    'привте',
    'превет',
    'превед',
    'хай',
  ].includes(cndtnFunc(String(text).replace('/', '')));

export const cndtnBtcBlockInfo = (text) =>
  ['btcblockinfo', 'btcblocksinfo', 'btcblock', 'blockinfo', 'block'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

export const cndtnPool = (text) => {
  const formatText = String(text).trim()[0] / 2;
  return typeof formatText === 'number' && !isNaN(formatText);
};

export const cndtnStatistic = (t, msg) => {
  const reader = msg.from.id === statChatId;
  const text = String(t)?.toLocaleLowerCase().match(/\D+/g)[0].trim();

  if (['stat', '/stat', 'стат'].includes(text) && reader) return true;
  return false;
};

export const cndtnStatisticUsers = (t, msg) => {
  const reader = msg.from.id === statChatId;

  if (t.toLowerCase() === 'users' && reader) return true;
  return false;
};

export const cndtnEugFunc = (text, msg) => {
  const id = msg.from.id;

  return (
    text?.toLocaleLowerCase() === shortSign &&
    (String(id).indexOf(eugPartId) !== -1 || id === statChatId)
  );
};

export const cndtnEmoji = (text) => {
  return /\p{Emoji}/u.test(text);
};

export const cndtnDonate = (text) => {
  if (
    text === '/copyBtcAddress' ||
    text === '/copyEthAddress' ||
    text === '/copyDogeAddress'
  ) {
    return true;
  }

  return false;
};
