import axios from 'axios';

import { chartBtns } from '../modules/buttons.js';
import { currencyMsg } from '../modules/messages.js';
import { bfUrl } from '../../token.js';

let messageId = '';
let refreshBtnMessageId = '';

export const bfHttpRequest = async (bot, chatId, textInner, msg, isRefresh) => {
  const pathParams = 'ticker';
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toUpperCase().slice(1)}`;

  return axios
    .get(`${bfUrl}/${pathParams}/${queryParams}`)
    .then(
      async (response) => {
        const data = response.data;
        const isBuy = Number(data?.[1]) < Number(data?.[3]);
        const recommendationText = isBuy ? 'Buy 🟢' : 'Sell 🔴';

        let title =
          String(text).length === 7
            ? `${text.toUpperCase().slice(1, 4)}/${text.toUpperCase().slice(4)}`
            : `${String(text).slice(1).toUpperCase().replace(':', '/')}`;
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
        const chartButton = chartBtns(textInner);

        if (isRefresh) {
          try {
            await bot.editMessageText(answer, {
              chat_id: chatId,
              message_id: messageId,
            });
          } catch (error) {
            if (refreshBtnMessageId) {
              bot.deleteMessage(chatId, refreshBtnMessageId);
            }
            bot.sendMessage(
              chatId,
              "Price hasn't changed. Please, try again later",
            );
          }
        } else {
          const sentMessage = await bot.sendMessage(chatId, answer);
          const sentRefresh = await bot.sendMessage(
            chatId,
            'More actions',
            chartButton,
          );

          messageId = sentMessage.message_id;
          refreshBtnMessageId = sentRefresh.message_id;
        }
      },
      (error) => {
        messageId = '';
        refreshBtnMessageId = '';
        bot.sendMessage(chatId, `No data... Error: ${error}`);
      },
    )
    .finally(() => {
      msg && !isRefresh
        ? bot.deleteMessage(chatId, msg.message.message_id)
        : null;
    });
};
