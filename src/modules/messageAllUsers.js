import { getUsers } from '../api/getUsers.js';
import { statChatId } from '../../token.js';

export const messageAllUsers = async (bot, text) => {
  const data = await getUsers(bot);
  const idsArr = Object.values(data.data).map((el) => el.id);

  for await (const id of idsArr) {
    bot.sendMessage(id, text);
  }

  await bot.sendMessage(statChatId, 'Messaging has finished');
};
