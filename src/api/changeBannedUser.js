import axios from 'axios';
import { statUrl } from '../../token.js';

import { sendErrorMessage } from '../modules/messages.js';

export const changeBannedUser = async (bot, chatId, msg, isBanFlag) => {
  const bannedId = msg.text;

  const allUsers = await axios
    .get(`${statUrl}users.json`)
    .then((response) => response)
    .catch((error) => sendErrorMessage(error, bot, chatId));

  const bannedUserObj = await Object.entries(allUsers?.data)?.find(
    (el) => String(el[1].id) === String(bannedId),
  );

  const [bannedUserObjId, bannedUserObjData] = bannedUserObj || [null, null];

  // ============================ banned ids api ============================ //
  const data = await axios
    .get(`${statUrl}bannedIds.json`)
    .then((response) => response)
    .catch((error) => sendErrorMessage(error, bot, chatId));
  const allBannedUsersIds = await data.data;

  if (isBanFlag) {
    await axios.post(`${statUrl}bannedIds.json`, bannedId);
  } else {
    const deletedDbId = Object.entries(allBannedUsersIds).find(
      (el) => String(el[1]) === String(bannedId),
    )?.[0];

    if (allBannedUsersIds?.[deletedDbId]) {
      delete allBannedUsersIds[deletedDbId];
    } else {
      await bot.sendMessage(
        chatId,
        `Sorry, I did't find the user with id ${deletedDbId} in data base`,
      );
    }
    await axios.put(`${statUrl}bannedIds.json`, allBannedUsersIds);
  }
  // ============================ banned ids api ============================ //

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
