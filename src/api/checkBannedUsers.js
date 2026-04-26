import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statUrl = process.env.STAT_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const checkBannedUsers = async (bot, chatId) => {
  if (String(chatId) === String(statChatId)) return false;

  const data = await axios
    .get(`${statUrl}bannedIds.json`)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in checkBannedUsers: ${error}`, bot, statChatId),
    );

  const allBannedUsersIds = await data.data;

  if (
    allBannedUsersIds &&
    Object?.values(allBannedUsersIds)?.includes(chatId)
  ) {
    await bot.sendMessage(chatId, `Sorry, you has banned`);
    return true;
  }
  return false;
};
