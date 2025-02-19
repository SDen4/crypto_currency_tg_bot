import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const postUsers = async (bot, newUser) => {
  return await axios
    .post(`${statUrl}users.json`, newUser)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in postUsers: ${error}`, bot, statChatId),
    );
};
