import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statChatId = process.env.STAT_CHAT_ID;
const fiatApiPair = process.env.FIAT_API_PAIR;

export const getFiatPairs = async (bot, chatId, params) => {
  return await axios
    .get(`${fiatApiPair}${params}`)
    .then(async (response) => {
      const rate = response?.data?.conversion_rate;
      const base_code = response?.data?.base_code;
      const target_code = response?.data?.target_code;

      if (rate) {
        await bot.sendMessage(
          chatId,
          `1 ${base_code} = ${rate} ${target_code}`,
        );
      }
    })
    .catch((error) =>
      sendErrorMessage(`in getFiatPairs: ${error}`, bot, statChatId),
    );
};
