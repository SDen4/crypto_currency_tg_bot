import axios from 'axios';

import { formatNumber } from '../utils/formatNumber.js';
import { bfUrl, statChatId } from '../../token.js';

export const bfHttpInfoRequest = (
  bot,
  chatIdArr,
  textInner,
  state,
  alertPersent,
) => {
  const pathParams = 'ticker';
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1)}`;
  let promise;

  return (promise = axios.get(`${bfUrl}/${pathParams}/${queryParams}`).then(
    (response) => {
      const data = response.data;

      const number = Math.abs(data[5] * 100); // % difference

      if (number >= alertPersent && number > state.prevValue) {
        state.prevValue = number;

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
        if (text === '/atousd') title = 'ATOM/USD';
        if (text === '/tsdusd') title = 'TUSD/USD';
        if (text === '/omnusd') title = 'OMNI/USD';
        if (text === '/algusd') title = 'ALGO/USD';
        if (text === '/wbtusd') title = 'WBTC/USD';
        if (text === '/hixusd') title = 'HI/USD';
        if (text === '/dshusd') title = 'DASH/USD';

        const emoji = data[5] > 0 ? '🟢' : '🔻';
        const answer = `
${title}: ${formatNumber(data[0])}
-------------------
${emoji} 24h: ${formatNumber(number, 2, '%')} ${emoji}`;

        for (let i = 0; i < chatIdArr.length; i++) {
          bot.sendMessage(chatIdArr[i], answer);
        }
      } else {
        state.prevValue = 0;
      }
    },
    (error) => {
      bot.sendMessage(statChatId, `No data... Error: ${error}`);
    },
  ));
};
