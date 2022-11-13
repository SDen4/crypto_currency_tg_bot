const { conditionFunc } = require('../utils/conditionFunc');

const cndtnCurrencies = (text) =>
  [
    'btcusd',
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
  ].includes(conditionFunc(String(text).replace('/', '')));

const cndtnInfo = (text) =>
  ['info', 'штащ', 'help', 'рудз', 'инфо'].includes(
    conditionFunc(String(text).replace('/', '')),
  );

const cndtnCurrenciesBtns = (text) =>
  ['currencies', 'сгккутсшуы', 'curr', 'сгкк', 'cur', 'сгк'].includes(
    conditionFunc(String(text).replace('/', '')),
  );

const cndtnSecret = (text) =>
  ['secret', 'ыускуе', 'secr', 'ыуск'].includes(
    conditionFunc(String(text).replace('/', '')),
  );

const cndtnStart = (text) =>
  ['start', 'ыефке', 'старт', 'begin'].includes(
    conditionFunc(String(text).replace('/', '')),
  );

const cndtnBtcBlockInfo = (text) =>
  ['btcblockinfo', 'btcblocksinfo', 'btcblock', 'blockinfo', 'block'].includes(
    conditionFunc(String(text).replace('/', '')),
  );

module.exports = {
  cndtnCurrencies,
  cndtnInfo,
  cndtnCurrenciesBtns,
  cndtnSecret,
  cndtnStart,
  cndtnBtcBlockInfo,
};
