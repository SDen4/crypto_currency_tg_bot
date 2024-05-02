import axios from 'axios';

import { visitsStatUrl, usersStatUrl, statChatId } from '../../token.js';

let userIds = [];

export const saveStat = async (visit) => {
  const id = visit?.from?.id || visit?.chat?.id;
  if (id === statChatId) return;

  if (!userIds.length) {
    const users = await axios
      .get(usersStatUrl, visit)
      .then((response) => response);

    userIds = Object.values(users?.data).map((el) => el?.id);
  }

  if (!userIds.includes(id)) {
    const newUser = {
      id,
      firstName: visit?.from?.first_name,
      lastName: visit?.from?.last_name,
      username: visit?.from?.username,
      isBot: visit?.from?.is_bot,
      lang: visit?.from?.language_code,
      firstVisit: new Date().getTime(),
      isPremium: visit?.from?.is_premium,
    };

    userIds.push(id);

    await axios.post(usersStatUrl, newUser).then((response) => response);
  }

  await axios.post(visitsStatUrl, visit).then((response) => response);
};

export const getVisitsStat = async () => {
  const res = await axios.get(visitsStatUrl).then((response) => response);

  return res;
};

export const getUsersStat = async () => {
  const res = await axios.get(usersStatUrl).then((response) => response);

  return res;
};
