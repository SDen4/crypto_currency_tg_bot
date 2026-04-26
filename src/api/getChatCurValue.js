import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const bfUrl = process.env.BF_URL;
const statChatId = process.env.STAT_CHAT_ID;

export const getChatCurValue = (bot, textInner) => {
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toUpperCase().slice(1, -10)}`;

  return axios
    .get(`${bfUrl}/ticker/${queryParams}`)
    .then((response) => response.data[0])
    .catch((error) =>
      sendErrorMessage(`Error in getChatCurValue: ${error}`, bot, statChatId),
    );
};
