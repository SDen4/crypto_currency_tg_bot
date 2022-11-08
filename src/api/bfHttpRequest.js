const axios = require('axios');

const { formatNumber } = require('../utils/formatNumber');

const bfHttpRequest = (bot, chatId, text) => {
  const baseUrl = 'https://api-pub.bitfinex.com/v2';
  const pathParams = 'ticker';
  const queryParams = `t${text.toLocaleUpperCase().slice(1)}`;

  return (promise = axios.get(`${baseUrl}/${pathParams}/${queryParams}`).then(
    (response) => {
      const data = response.data;
      const isBuy = Number(data?.[1]) < Number(data?.[3]);
      const isBuyText = isBuy ? 'Buy' : 'Sell';

      let title =
        String(text).length === 7
          ? `${text.toLocaleUpperCase().slice(1, 4)}/${text
              .toLocaleUpperCase()
              .slice(4)}`
          : `${String(text).slice(1).toLocaleUpperCase().replace(':', '/')}`;
      if (text === '/ustusd') title = 'USDt/USD';

      const answer = `${title}: ${formatNumber(data[0])}
-----------------------------------
24h: ${formatNumber(data[5] * 100, 2, '%')}
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
  ));
};

module.exports = { bfHttpRequest };
