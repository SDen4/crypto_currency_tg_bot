import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const getUsers = async (bot) => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in getUsers: ${error}`, bot, statChatId),
    );
};
