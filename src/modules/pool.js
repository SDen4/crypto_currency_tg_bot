const axios = require('axios');

const { cndtnPool } = require('./conditions');
const { formatNumber } = require('../utils/formatNumber');

const pool = async (bot, chatId, msg) => {
  const msgArr = String(msg)
    .trim()
    .split(' ')
    .filter((el) => el.trim() !== '');
  const resultArr = [];

  for (let i = 0; i < msgArr.length; i++) {
    if (cndtnPool(msgArr[i]) && typeof msgArr[i + 1] === 'string') {
      resultArr.push({
        quantity: msgArr[i],
        currency: msgArr[i + 1],
        value: 0,
      });
      i++;
    }
  }

  const baseUrl = 'https://api-pub.bitfinex.com/v2';
  const pathParams = 'ticker';

  for (let i = 0; i < resultArr.length; i++) {
    let firstCur = resultArr[i].currency;

    if (
      firstCur === 'doge' ||
      firstCur === 'avax' ||
      firstCur === 'bchn' ||
      firstCur === 'gala' ||
      firstCur === 'link' ||
      firstCur === 'matic' ||
      firstCur === 'sushi'
    )
      firstCur = `${resultArr[i].currency}:`;

    const requestStr = `${firstCur}usd`;
    const queryParams = `t${requestStr.toLocaleUpperCase()}`;

    const pr = await axios
      .get(`${baseUrl}/${pathParams}/${queryParams}`)
      .then((response) => {
        const data = response.data[0];
        return data;
      });

    resultArr[i].value = pr;
  }

  const result = [`Your pool\n--------------\n`];
  let sum = 0;

  for (let i = 0; i < resultArr.length; i++) {
    const subSum = resultArr[i].quantity * resultArr[i].value;
    const x = resultArr[i].quantity;
    const y = resultArr[i].currency.toLocaleUpperCase();

    result.push(`${x} ${y} = $${formatNumber(subSum, 2)}\n`);

    sum += subSum;
  }

  result.push(`--------------\nTotal: $${formatNumber(sum, 2)}`);

  await bot.sendMessage(chatId, `${result.join('')}`);
};

module.exports = { pool };
