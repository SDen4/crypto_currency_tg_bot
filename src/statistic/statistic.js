import { statChatId } from '../../token.js';
import { getUsers } from '../api/getUsers.js';
import { postMsg } from '../api/postMsg.js';
import { postUsers } from '../api/postUsers.js';

let userIds = [];

export const saveStat = async (msg) => {
  const id = msg?.from?.id || msg?.chat?.id;
  if (id === statChatId) return;

  if (!userIds.length) {
    const users = await getUsers();

    userIds = Object.values(users?.data).map((el) => el?.id);
  }

  if (!userIds.includes(id)) {
    const newUser = {
      id,
      firstName: msg?.from?.first_name,
      lastName: msg?.from?.last_name,
      username: msg?.from?.username,
      isBot: msg?.from?.is_bot,
      lang: msg?.from?.language_code,
      firstVisit: new Date().getTime(),
      isPremium: msg?.from?.is_premium,
    };

    userIds.push(id);

    await postUsers(newUser);
  }

  await postMsg(msg);
};
