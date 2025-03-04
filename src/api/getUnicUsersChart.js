import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const getUnicUsersChart = async (bot) => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => {
      return Object.values(response.data)
        .map((el) => {
          const date = new Date(el.firstVisit);

          return `${date.getUTCDate()}.${
            date.getUTCMonth() + 1
          }.${date.getUTCFullYear()}`;
        })
        .reduce((acc, cur) => {
          acc[cur] = (acc[cur] || 0) + 1;
          return acc;
        }, {});
    })
    .catch((error) =>
      sendErrorMessage(`Error in getUnicUsersChart: ${error}`, bot, statChatId),
    );
};
