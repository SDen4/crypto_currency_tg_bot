import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statUrl = process.env.STAT_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const postUsers = async (bot, newUser) => {
  return await axios
    .post(`${statUrl}users.json`, newUser)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in postUsers: ${error}`, bot, statChatId),
    );
};
