const { conditionFunc } = require('../utils/conditionFunc');

const conditionCurrencirs = (text) =>
  conditionFunc(text) === '/btcusd' ||
  conditionFunc(text) === '/btceur' ||
  conditionFunc(text) === '/ethusd' ||
  conditionFunc(text) === '/etheur' ||
  conditionFunc(text) === '/ltcusd' ||
  conditionFunc(text) === '/ltceur' ||
  conditionFunc(text) === '/solusd' ||
  conditionFunc(text) === '/xrpusd' ||
  conditionFunc(text) === '/adausd' ||
  conditionFunc(text) === '/eosusd' ||
  conditionFunc(text) === '/aptusd' ||
  conditionFunc(text) === '/filusd' ||
  conditionFunc(text) === '/ustusd' ||
  conditionFunc(text) === '/doge:usd' ||
  conditionFunc(text) === '/matic:usd' ||
  conditionFunc(text) === '/sushi:usd' ||
  conditionFunc(text) === '/link:usd' ||
  conditionFunc(text) === '/avax:usd' ||
  conditionFunc(text) === '/xmrusd' ||
  conditionFunc(text) === '/dotusd' ||
  conditionFunc(text) === '/bchn:usd' ||
  conditionFunc(text) === '/udcusd' ||
  conditionFunc(text) === '/iotusd' ||
  conditionFunc(text) === '/trxusd' ||
  conditionFunc(text) === '/xcnusd' ||
  conditionFunc(text) === '/uniusd' ||
  conditionFunc(text) === '/gala:usd' ||
  conditionFunc(text) === '/leousd';

module.exports = { conditionCurrencirs };
