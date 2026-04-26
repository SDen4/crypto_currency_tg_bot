import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statUrl = process.env.STAT_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const getUsersQuantity = async (bot) => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => Object.keys(response?.data)?.length)
    .catch((error) =>
      sendErrorMessage(`Error in getUsersQuantity: ${error}`, bot, statChatId),
    );
};
