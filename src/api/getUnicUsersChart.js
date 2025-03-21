import axios from 'axios';

import { weekDays } from '../constants/index.js';
import { formatDateNumber } from '../utils/formatDateNumber.js';
import { sendErrorMessage } from '../modules/messages.js';
import { statUrl, statChatId } from '../../token.js';

export const getUnicUsersChart = async (bot, isWeekDay) => {
  return await axios
    .get(`${statUrl}users.json`)
    .then((response) => {
      return Object.values(response.data)
        .map((el) => {
          const date = new Date(el.firstVisit);

          let dateStr = `${formatDateNumber(
            date.getUTCDate(),
          )}.${formatDateNumber(
            date.getUTCMonth() + 1,
          )}.${date.getUTCFullYear()}`;

          if (isWeekDay)
            dateStr = `${dateStr} (${weekDays[date?.getUTCDay()]})`;

          return dateStr;
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
