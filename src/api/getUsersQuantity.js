import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const getUsersQuantity = async (bot) => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => Object.keys(response?.data)?.length)
    .catch((error) =>
      sendErrorMessage(`Error in getUsersQuantity: ${error}`, bot, statChatId),
    );
};
