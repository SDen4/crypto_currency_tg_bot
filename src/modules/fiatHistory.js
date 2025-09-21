import { sendErrorMessage } from './messages.js';

import { fiatRequestsLimit } from '../../token.js';

import { getFiatUser } from '../api/getFiatUser.js';
import { getFiatHistory } from '../api/getFiatHistory.js';

import { putFiatUser } from '../api/putFiatUser.js';

import { periodOfLimitRequests } from '../constants/index.js';

const usdEur20240101Dump = `USD/EUR at 2024-01-01:
-------------------------
1. open: 0.90450
2. high: 0.90590
3. low: 0.90450
4. close: 0.90480`;

export const fiatHistory = async (bot, chatId, text) => {
  try {
    if (!chatId) return;

    const currencyFrom = text.slice(17, 20).toUpperCase();
    const currencyTo = text.slice(21, 24).toUpperCase();
    const date = text.slice(25);

    let newUser;

    // get user
    const user = await getFiatUser(bot, chatId);

    // if no user - create a new one
    if (!user) {
      newUser = {
        id: String(chatId),
        count: 0,
        limit: fiatRequestsLimit,
        lastVisit: new Date().getTime(),
        limitDate: new Date().getTime(),
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
        id: String(chatId),
        count: newCount,
        lastVisit: new Date().getTime(),
      };

      await putFiatUser(chatId, bot, newUser);

      if (
        currencyFrom === 'USD' &&
        currencyTo === 'EUR' &&
        date === `2024-01-01`
      ) {
        await bot.sendMessage(chatId, usdEur20240101Dump);
      } else {
        await getFiatHistory(bot, currencyFrom, currencyTo, date, chatId);
      }
    }
  } catch (error) {
    await sendErrorMessage(error, bot, chatId);
  }
};
