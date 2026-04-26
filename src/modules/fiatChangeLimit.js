const statChatId = process.env.STAT_CHAT_ID;

import { getFiatUser } from '../api/getFiatUser.js';
import { putFiatUser } from '../api/putFiatUser.js';

import { sendErrorMessage } from './messages.js';

export const fiatChangeLimit = async (bot, text) => {
  try {
    const newLimit = text.slice(26, 28);
    const id = text.slice(29);

    const user = await getFiatUser(bot, id);

    if (user) {
      await putFiatUser(id, bot, {
        ...user,
        limit: Number(newLimit),
        limitDate: new Date().getTime(),
      })
        .then(async (res) => {
          if (res) {
            await bot.sendMessage(
              statChatId,
              `🎉 Success 🎉 \nUser ${id} now has a limit of ${newLimit}`,
              { parse_mode: 'HTML' },
            );
          }
        })
        .catch(
          async (error) =>
            await sendErrorMessage(
              `in set new limit for user (id: ${id}): ${error}`,
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
    await sendErrorMessage(`in fiatChangeLimit: ${error}`, bot, statChatId);
  }
};
