import axios from 'axios';

import { formatNumber } from '../utils/formatNumber.js';
import { bfUrl } from '../../token.js';

export const bfHttpRequest = (bot, chatId, textInner) => {
  const pathParams = 'ticker';
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1)}`;

  return axios.get(`${bfUrl}/${pathParams}/${queryParams}`).then(
    (response) => {
      const data = response.data;
      const isBuy = Number(data?.[1]) < Number(data?.[3]);
      const isBuyText = isBuy ? 'Buy 🟢' : 'Sell 🔴';

      let title =
        String(text).length === 7
          ? `${text.toLocaleUpperCase().slice(1, 4)}/${text
              .toLocaleUpperCase()
              .slice(4)}`
          : `${String(text).slice(1).toLocaleUpperCase().replace(':', '/')}`;
      // exceptions
      if (text === '/ustusd') title = 'USDt/USD';
      if (text === '/udcusd') title = 'USDC/USD';
      if (text === '/iotusd') title = 'IOTA/USD';
      if (text === '/euteur') title = 'EURt/EUR';
      if (text === '/algusd') title = 'ALGO/USD';
      if (text === '/hixusd') title = 'HI/USD';
      if (text === '/dshusd') title = 'DASH/USD';

      const answer = `${title}: ${formatNumber(data[0])}
-----------------------------------
24h: ${formatNumber(data[5] * 100, 2, '%')} ${data[5] * 100 < 0 ? '⬇️' : '⬆️'}
Price of the last trade: ${formatNumber(data[6])}
Price of the last lowest ask: ${formatNumber(data[2])}
Sum of the 25 highest bid sizes: ${formatNumber(data[1], 2)}
Sum of the 25 lowest ask sizes: ${formatNumber(data[3], 2)}
Daily high: ${formatNumber(data[8])}
Daily low: ${formatNumber(data[9])}
Daily volume: ${formatNumber(data[7], 0)}
Amount that the last price has changed since yesterday: ${formatNumber(data[4])}
-----------------------------------
Recommendation: ${isBuyText}`;

      bot.sendMessage(chatId, answer);
    },
    (error) => {
      bot.sendMessage(chatId, `No data... Error: ${error}`);
    },
  );
};
