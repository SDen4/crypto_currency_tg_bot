const { cndtnFunc } = require('../utils/cndtnFunc');

const cndtnCurrencies = (text) =>
  [
    'btcusd',
    'btc',
    'btceur',
    'ethusd',
    'etheur',
    'euteur',
    'ltcusd',
    'ltceur',
    'solusd',
    'xrpusd',
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
    'xmrusd',
    'dotusd',
    'bchn:usd',
    'udcusd',
    'iotusd',
    'trxusd',
    'xcnusd',
    'uniusd',
    'gala:usd',
    'leousd',
    'paxusd',
    'xtzusd',
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
  ['secret', 'ыускуе', 'secr', 'ыуск'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

const cndtnStart = (text) =>
  ['start', 'ыефке', 'старт', 'begin'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

const cndtnBtcBlockInfo = (text) =>
  ['btcblockinfo', 'btcblocksinfo', 'btcblock', 'blockinfo', 'block'].includes(
    cndtnFunc(String(text).replace('/', '')),
  );

module.exports = {
  cndtnCurrencies,
  cndtnInfo,
  cndtnCurrenciesBtns,
  cndtnSecret,
  cndtnStart,
  cndtnBtcBlockInfo,
};
