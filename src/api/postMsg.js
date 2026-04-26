import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statUrl = process.env.STAT_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const postMsg = async (bot, newUser) => {
  return await axios
    .post(`${statUrl}visits.json`, newUser)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in postMsg: ${error}`, bot, statChatId),
    );
};
