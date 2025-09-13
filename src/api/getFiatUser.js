import axios from 'axios';

import { statUrl, statChatId } from '../../token.js';
import { sendErrorMessage } from '../modules/messages.js';

export const getFiatUser = async (id, bot) => {
  return await axios
    .get(`${statUrl}fiat/${id}.json`)
    .then((response) => response.data)
    .catch((error) =>
      sendErrorMessage(`in getFiatUser: ${error}`, bot, statChatId),
    );
};
