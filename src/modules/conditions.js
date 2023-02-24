const { cndtnFunc } = require('../utils/cndtnFunc');
const { statChatId, shortSign, eugPartId } = require('../../token');

const cndtnCurrencies = (text) =>
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

const cndtnInfo = (text) =>
  ['info', 'штащ', 'help', 'рудз', 'инфо'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

const cndtnCurrenciesBtns = (text) =>
  ['currencies', 'сгккутсшуы', 'curr', 'сгкк', 'cur', 'сгк'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

const cndtnSecret = (text) =>
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

const cndtnStart = (text) =>
  ['start', 'ыефке', 'старт', 'begin'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

const cndtnBtcBlockInfo = (text) =>
  ['btcblockinfo', 'btcblocksinfo', 'btcblock', 'blockinfo', 'block'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

const cndtnPool = (text) => {
  const formatText = String(text).trim()[0] / 2;
  return typeof formatText === 'number' && !isNaN(formatText);
};

const cndtnStatistic = (t, msg) => {
  const reader = msg.from.id === statChatId;
  const text = String(t)?.toLocaleLowerCase().match(/\D+/g)[0].trim();

  if (['stat', '/stat', 'стат'].includes(text) && reader) return true;
  return false;
};

const cndtnEugFunc = (text, msg) => {
  const id = msg.from.id;

  return (
    text?.toLocaleLowerCase() === shortSign &&
    String(id).indexOf(eugPartId) !== -1
  );
};

const cndtnEmoji = (text) => {
  return /\p{Emoji}/u.test(text);
};

module.exports = {
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
};
