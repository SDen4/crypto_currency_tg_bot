import axios from 'axios';

import { statChatId, fiatApiAll } from '../../token.js';
import { sendErrorMessage } from '../modules/messages.js';

export const getFiatAll = async (bot, chatId, params) => {
  return await axios
    .get(`${fiatApiAll}${params}`)
    .then(async (response) => {
      const base_code = response?.data?.base_code;
      const rates = response?.data?.conversion_rates;

      if (rates) {
        const message = Object.entries(rates)
          .map((el, i) =>
            i === 0
              ? `All rates for ${base_code}:\n------------------`
              : `1 ${base_code} = ${el[1]} ${el[0]}`,
          )
          .join('\n');

        await bot.sendMessage(chatId, message);
      }
    })
    .catch((error) =>
      sendErrorMessage(`in getFiatAll: ${error}`, bot, statChatId),
    );
};
