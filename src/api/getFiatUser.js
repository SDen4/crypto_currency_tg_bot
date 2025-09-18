import axios from 'axios';

import { statUrl, statChatId } from '../../token.js';
import { sendErrorMessage } from '../modules/messages.js';

/**
 * Get fiat user (if id) or users
 * @param {*} id
 * @param {*} bot
 * @returns
 */
export const getFiatUser = async (bot, id) => {
  return await axios
    .get(`${statUrl}fiat${id ? `/${id}` : ''}.json`)
    .then((response) => response.data)
    .catch((error) =>
      sendErrorMessage(`in getFiatUser: ${error}`, bot, statChatId),
    );
};
