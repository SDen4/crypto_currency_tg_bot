import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import { bfUrl, statChatId } from '../../token.js';

export const getChatCurValue = (bot, textInner) => {
  const text = textInner[0] === '/' ? textInner : `/${textInner}`;
  const queryParams = `t${text.toLocaleUpperCase().slice(1, -10)}`;

  return axios
    .get(`${bfUrl}/ticker/${queryParams}`)
    .then((response) => response.data[0])
    .catch((error) =>
      sendErrorMessage(`Error in getChatCurValue: ${error}`, bot, statChatId),
    );
};
