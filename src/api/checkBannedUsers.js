import axios from 'axios';
import { statUrl, statChatId } from '../../token.js';

export const checkBannedUsers = async (bot, chatId) => {
  if (chatId === statChatId) return false;

  const data = await axios
    .get(`${statUrl}bannedIds.json`)
    .then((response) => response);

  const allBannedUsersIds = await data.data;

  if (Object.values(allBannedUsersIds).includes(chatId)) {
    bot.sendMessage(chatId, `Sorry, you has banned`);
    return true;
  }

  return false;
};
