import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statChatId = process.env.STAT_CHAT_ID;
const fiatApiRest = process.env.FIAT_API_REST;

export const getFiatRest = async (bot) => {
  return await axios
    .get(fiatApiRest)
    .then(async (response) => {
      const result = response?.data?.result;
      const plan_quota = response?.data?.plan_quota;
      const requests_remaining = response?.data?.requests_remaining;
      const refresh_day_of_month = response?.data?.refresh_day_of_month;

      if (result === 'success') {
        await bot.sendMessage(
          statChatId,
          `Current fiat quota:\n--------------------\nQuota: ${plan_quota}\nRefresh day: ${refresh_day_of_month}\nRemaining requests: ${requests_remaining}\nRequests in this month: ${
            plan_quota - requests_remaining
          }`,
        );
      }
    })
    .catch((error) =>
      sendErrorMessage(`in getFiatRest: ${error}`, bot, statChatId),
    );
};
