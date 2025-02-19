import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const postMsg = async (bot, newUser) => {
  return await axios
    .post(`${statUrl}visits.json`, newUser)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in postMsg: ${error}`, bot, statChatId),
    );
};
