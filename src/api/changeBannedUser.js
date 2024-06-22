import axios from 'axios';
import { statUrl } from '../../token.js';

export const changeBannedUser = async (bot, chatId, msg, isBanFlag) => {
  const bannedId = msg.text;
  const allUsers = await axios
    .get(`${statUrl}users.json`)
    .then((response) => response);

  const bannedUserObj = await Object.entries(allUsers.data).find(
    (el) => String(el[1].id) === String(bannedId),
  );

  const [bannedUserObjId, bannedUserObjData] = bannedUserObj;

  if (bannedUserObjId) {
    const newAllUsers = {
      ...allUsers.data,
      [bannedUserObjId]: { ...bannedUserObjData, isBanned: isBanFlag },
    };

    await axios.put(`${statUrl}users.json`, newAllUsers);
    await bot.sendMessage(
      chatId,
      `User with id ${bannedId} has ${isBanFlag ? 'banned' : 'unbanned'}`,
    );
  } else {
    await bot.sendMessage(
      chatId,
      `Sorry, I did't find the user with id ${bannedId} in data base`,
    );
  }
};
