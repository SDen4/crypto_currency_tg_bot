const axios = require('axios');

const { formatNumber } = require('../utils/formatNumber');
const { bfUrl } = require('../../token');

const bfHttpInfoRequest = (bot, chatId, textInner, alertPersent) => {
  const pathParams = 'ticker';
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1)}`;

  return (promise = axios.get(`${bfUrl}/${pathParams}/${queryParams}`).then(
    (response) => {
      const data = response.data;

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

      const answer = `
${title}: ${formatNumber(data[0])}
-------------------
❗️ 24h: ${formatNumber(data[5] * 100, 2, '%')} ❗️
`;

      if (Math.abs(data[5] * 100) >= alertPersent) {
        bot.sendMessage(chatId, answer);
      }
    },
    (error) => {
      bot.sendMessage(chatId, `No data... Error: ${error}`);
    },
  ));
};

module.exports = { bfHttpInfoRequest };
