import axios from 'axios';

import { formatNumber } from '../utils/formatNumber.js';
import { bfUrl, statChatId } from '../../token.js';

export const bfHttpInfoRequest = (bot, chatIdArr, textInner, alertPersent) => {
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

      // ============================== answer text, do not format ============================== //
      const number = Math.abs(data[5] * 100);
      const emojiL = data[5] > 0 ? '🟢' : '❗️🔻';
      const emojiR = data[5] > 0 ? '🟢' : '🔻❗️';
      const answer = `
${title}: ${formatNumber(data[0])}
-------------------
${emojiL} 24h: ${formatNumber(number, 2, '%')} ${emojiR}
`;
      // ============================== answer text, do not format ============================== //

      if (number >= alertPersent) {
        for (let i = 0; i < chatIdArr.length; i++) {
          bot.sendMessage(chatIdArr[i], answer);
        }
      }
    },
    (error) => {
      bot.sendMessage(statChatId, `No data... Error: ${error}`);
    },
  ));
};
