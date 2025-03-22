import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const checkBannedUsers = async (bot, chatId) => {
  if (chatId === statChatId) return false;

  const data = await axios
    .get(`${statUrl}bannedIds!.json`)
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
  await bot.sendMessage(chatId, `Sorry, you has banned`);
  return false;
};
