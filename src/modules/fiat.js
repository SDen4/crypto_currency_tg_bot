import { sendErrorMessage } from './messages.js';

import { fiatRequestsLimit } from '../../token.js';

import { getFiatUser } from '../api/getFiatUser.js';
import { putFiatUser } from '../api/putFiatUser.js';
import { getFiatPairs } from '../api/getFiatPairs.js';
import { getFiatAll } from '../api/getFiatAll.js';

import { periodOfLimitRequests } from '../constants/index.js';

export const fiat = async (bot, chatId, text, msg, type) => {
  try {
    const id = msg?.from?.id || msg?.chat?.id;
    let newUser;

    // get user
    const user = await getFiatUser(id, bot);

    // if no user - create a new one
    if (!user) {
      newUser = {
        id: String(id),
        count: 0,
        limit: fiatRequestsLimit,
        lastVisit: new Date().getTime(),
        limitDate: new Date().getTime(), // TEMP !!!
      };
    } else {
      newUser = user;
    }

    let newCount = newUser.count + 1;

    //  reset limit after limit period
    if (new Date().getTime() - newUser.lastVisit > periodOfLimitRequests) {
      newCount = 1;
    }

    // check count for limit
    if (newCount > newUser.limit) {
      await bot.sendMessage(
        chatId,
        `You've exceeded your limit (${newUser.limit} requests per day). Please, try again later.`,
      );

      return;
    } else {
      newUser = {
        ...newUser,
        id: String(id),
        count: newCount,
        lastVisit: new Date().getTime(),
      };

      await putFiatUser(id, bot, newUser);
    }

    if (type === 'pair') {
      const params = text.slice(11);
      await getFiatPairs(bot, chatId, params);
    }
    if (type === 'all') {
      const params = text.slice(10);
      await getFiatAll(bot, chatId, params);
    }
  } catch (error) {
    await sendErrorMessage(error, bot, chatId);
  }
};
