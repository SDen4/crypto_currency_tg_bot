import { fiatRequestsLimit } from '../../token.js';
import { getFiatUser } from '../api/getFiatUser.js';
import { sendErrorMessage } from './messages.js';
import { msToStr } from '../utils/msToStr.js';
import { periodOfLimitRequests } from '../constants/index.js';

export const limits = async (bot, chatId, msg) => {
  try {
    const user = await getFiatUser(bot, chatId);

    await bot.sendMessage(
      chatId,
      `${
        msg?.from?.first_name
      }, your limits:\n------------------\n1. fiat rates: ${
        user
          ? `${user.limit}/day (last 24h used: ${user.count})`
          : `${fiatRequestsLimit}/day`
      }\n${
        user && user.count === user.limit
          ? `available in ${msToStr(
              periodOfLimitRequests - (new Date().getTime() - user.lastVisit),
            )}`
          : ''
      }\n2. crypto rates: unlimited`,
    );
  } catch (error) {
    await sendErrorMessage(error, bot, chatId);
  }
};
