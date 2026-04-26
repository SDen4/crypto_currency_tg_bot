import axios from 'axios';

import { formatNumber } from '../utils/formatNumber.js';
import { getTitleExceptions } from '../utils/getTitleExceptions.js';

const statChatId = process.env.STAT_CHAT_ID;
const bfUrl = process.env.BF_URL;

export const bfHttpInfoRequest = (
  bot,
  chatIdArr,
  textInner,
  state,
  alertPercent,
) => {
  const pathParams = 'ticker';
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toUpperCase().slice(1)}`;
  let promise;

  return (promise = axios.get(`${bfUrl}/${pathParams}/${queryParams}`).then(
    (response) => {
      const data = response.data;

      const number = Math.abs(data[5] * 100); // % difference

      if (number >= alertPercent && number > state.prevValue) {
        state.prevValue = number;

        let title =
          String(text).length === 7
            ? `${text.toUpperCase().slice(1, 4)}/${text.toUpperCase().slice(4)}`
            : `${String(text).slice(1).toUpperCase().replace(':', '/')}`;
        // exceptions
        title = getTitleExceptions(text, title);

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
