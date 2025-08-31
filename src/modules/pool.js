import axios from 'axios';

import { cndtnPool } from './conditions.js';
import { formatNumber } from '../utils/formatNumber.js';
import { bfUrl } from '../../token.js';

export const pool = async (bot, chatId, msg) => {
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
    } else {
      await bot.sendMessage(chatId, 'Invalid format');
      return;
    }
  }

  const pathParams = 'ticker';

  for (let i = 0; i < resultArr.length; i++) {
    let firstCur = resultArr[i].currency;

    if (
      firstCur === 'doge' ||
      firstCur === 'avax' ||
      firstCur === 'bchn' ||
      firstCur === 'gala' ||
      firstCur === 'link' ||
      firstCur === 'sushi'
    )
      firstCur = `${resultArr[i].currency}:`;

    const requestStr = `${firstCur}usd`;
    const queryParams = `t${requestStr.toLocaleUpperCase()}`;

    const pr = await axios
      .get(`${bfUrl}/${pathParams}/${queryParams}`)
      .then((response) => {
        const data = response?.data[0];
        return data;
      })
      .catch((err) => {
        bot.sendMessage(chatId, `Can not find currency. Error: ${err}`);
      });

    if (!pr) return;

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
