import axios from 'axios';

import { fiatApiRest, statChatId } from '../../token.js';
import { sendErrorMessage } from '../modules/messages.js';

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
          `Current fiat quota:\n--------------------\nQuota: ${plan_quota}\nRefrash day: ${refresh_day_of_month}\nRemaining requests: ${requests_remaining}\nRequests in this month: ${
            plan_quota - requests_remaining
          }`,
        );
      }
    })
    .catch((error) =>
      sendErrorMessage(`in getFiatRest: ${error}`, bot, statChatId),
    );
};
