import { fiatRequestsLimit } from '../../token.js';
import { getFiatUser } from '../api/getFiatUser.js';
import { sendErrorMessage } from './messages.js';
import { msToStr } from '../utils/msToStr.js';
import { periodOfLimitRequests } from '../constants/index.js';

export const limits = async (bot, chatId, msg) => {
  try {
    const user = await getFiatUser(bot, chatId);
    const restTime =
      periodOfLimitRequests - (new Date().getTime() - user.lastVisit);
    const isTimeExpired = restTime <= 0;

    await bot.sendMessage(
      chatId,
      `${
        msg?.from?.first_name
      }, your limits:\n------------------\n1. fiat rates: ${
        user
          ? `${user.limit}/day (last 24h used: ${
              isTimeExpired ? 0 : user.count
            })`
          : `${fiatRequestsLimit}/day`
      }\n${
        user && user.count === user.limit && !isTimeExpired
          ? `available in ${msToStr(restTime)}`
          : ''
      }\n2. crypto rates: unlimited`,
    );
  } catch (error) {
    await sendErrorMessage(error, bot, chatId);
  }
};
