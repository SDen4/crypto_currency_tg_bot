import axios from 'axios';

import { chartBtn } from '../modules/buttons.js';
import { currencyMsg } from '../modules/messages.js';
import { bfUrl } from '../../token.js';

export const bfHttpRequest = (bot, chatId, textInner, msg) => {
  const pathParams = 'ticker';
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1)}`;

  return axios
    .get(`${bfUrl}/${pathParams}/${queryParams}`)
    .then(
      (response) => {
        const data = response.data;
        const isBuy = Number(data?.[1]) < Number(data?.[3]);
        const recommendationText = isBuy ? 'Buy 🟢' : 'Sell 🔴';

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
        if (text === '/hmstr:usd') title = 'HUMSTER/USD';
        if (text === '/hmstr:ust') title = 'HUMSTER/USDt';

        // message text
        const answer = currencyMsg(title, data, recommendationText);
        const chartButton = chartBtn(`${textInner}_set_chart`);

        bot.sendMessage(chatId, answer, chartButton);
      },
      (error) => {
        bot.sendMessage(chatId, `No data... Error: ${error}`);
      },
    )
    .finally(() => {
      msg ? bot.deleteMessage(chatId, msg.message.message_id) : null;
    });
};
