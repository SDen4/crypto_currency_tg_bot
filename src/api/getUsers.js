import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statUrl = process.env.STAT_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const getUsers = async (bot) => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in getUsers: ${error}`, bot, statChatId),
    );
};
