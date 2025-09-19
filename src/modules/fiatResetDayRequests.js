import { statChatId } from '../../token.js';

import { getFiatUser } from '../api/getFiatUser.js';
import { putFiatUser } from '../api/putFiatUser.js';

import { sendErrorMessage } from './messages.js';

export const fiatResetDayRequests = async (bot, text) => {
  try {
    const id = text.slice(21);

    const user = await getFiatUser(bot, id);

    if (user) {
      await putFiatUser(id, bot, { ...user, count: 0 })
        .then(async (res) => {
          if (res) {
            await bot.sendMessage(
              statChatId,
              `🎉 Success 🎉\nThe daily request count for user ID <code>${id}</code> has been reset.`,
              { parse_mode: 'HTML' },
            );
          }
        })
        .catch(
          async (error) =>
            await sendErrorMessage(
              `in reset day count for user (id: ${id}): ${error}`,
              bot,
              statChatId,
            ),
        );
    } else {
      await bot.sendMessage(
        statChatId,
        `⚠️ User with id <code>${id}</code> ⚠️\ndoesn't exist in fiat db.`,
        { parse_mode: 'HTML' },
      );
    }
  } catch (error) {
    await sendErrorMessage(
      `in fiatResetDayRequests: ${error}`,
      bot,
      statChatId,
    );
  }
};
