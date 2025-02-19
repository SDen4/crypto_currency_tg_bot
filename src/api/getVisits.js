import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const getVisits = async (bot) => {
  return await axios
    .get(`${statUrl}visits.json`)
    .then((response) => response)
    .catch((error) =>
      sendErrorMessage(`Error in getVisits: ${error}`, bot, statChatId),
    );
};
