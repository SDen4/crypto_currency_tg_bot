import axios from 'axios';
import { bfUrl } from '../../token.js';

import { generateMessageId } from '../utils/generateMessageId.js';

import { chartBtns } from '../modules/buttons.js';
import { currencyMsg, sendErrorMessage } from '../modules/messages.js';
import { deleteMessage } from '../modules/deleteMessage.js';

export const bfHttpRequest = async (bot, chatId, t, msg, refrId, delId) => {
  try {
    const msgId = generateMessageId(msg);

    if (delId) {
      await deleteMessage(bot, chatId, msgId);
      return;
    }

    const pathParams = 'ticker';
    const text = t[0] === '/' ? t : `/${t}`;
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
              ? `${text.toUpperCase().slice(1, 4)}/${text
                  .toUpperCase()
                  .slice(4)}`
              : `${String(text).slice(1).toUpperCase().replace(':', '/')}`;
          // exceptions
          if (text === '/ustusd') title = 'USDt/USD';
          if (text === '/udcusd') title = 'USDC/USD';
          if (text === '/iotusd') title = 'IOTA/USD';
          if (text === '/atousd') title = 'ATOM/USD';
          if (text === '/tsdusd') title = 'TUSD/USD';
          if (text === '/omnusd') title = 'OMNI/USD';
          if (text === '/algusd') title = 'ALGO/USD';
          if (text === '/hixusd') title = 'HI/USD';
          if (text === '/dshusd') title = 'DASH/USD';

          // message text
          const answer = currencyMsg(title, data, recommendationText);

          if (refrId) {
            try {
              await bot.editMessageText(answer, {
                chat_id: chatId,
                message_id: msgId,
                reply_markup: chartBtns(t, refrId)?.reply_markup,
              });
            } catch {
              bot.sendMessage(
                chatId,
                "Price hasn't changed. Please, try again later",
              );
            }
          } else {
            bot.sendMessage(chatId, answer, chartBtns(t, msgId));
          }
        },
        (error) => {
          bot.sendMessage(chatId, `No data... Error: ${error}`);
        },
      )
      .finally(() => {
        msg && !refrId ? bot.deleteMessage(chatId, msgId) : null;
      });
  } catch (error) {
    await sendErrorMessage(error, bot, chatId);
  }
};
