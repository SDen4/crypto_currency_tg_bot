import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const statUrl = process.env.STAT_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const putFiatUser = async (id, bot, newUser) => {
  return await axios
    .put(`${statUrl}fiat/${id}.json`, newUser)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`in putFiatUser: ${error}`, bot, statChatId),
    );
};
