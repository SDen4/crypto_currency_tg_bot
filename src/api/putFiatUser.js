import axios from 'axios';

import { statUrl, statChatId } from '../../token.js';
import { sendErrorMessage } from '../modules/messages.js';

export const putFiatUser = async (id, bot, newUser) => {
  return await axios
    .put(`${statUrl}fiat/${id}.json`, newUser)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`in putFiatUser: ${error}`, bot, statChatId),
    );
};
