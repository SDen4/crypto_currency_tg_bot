import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';
import {
  mpCurBlockUrl,
  mpHashUrl,
  mpLastBlock,
  statChatId,
} from '../../token.js';

export const mpCurBlockRequest = (bot) =>
  axios
    .get(mpCurBlockUrl)
    .then((r) => r.data)
    .catch((error) =>
      sendErrorMessage(`Error in mpCurBlockRequest: ${error}`, bot, statChatId),
    );

export const mpHashRequest = (bot) =>
  axios
    .get(mpHashUrl)
    .then((r) => r.data)
    .catch((error) =>
      sendErrorMessage(`Error in mpHashRequest: ${error}`, bot, statChatId),
    );

export const mpLastBlockRequest = (bot, hash) =>
  axios
    .get(`${mpLastBlock}${hash}`)
    .then((r) => r.data)
    .catch((error) =>
      sendErrorMessage(
        `Error in mpLastBlockRequest: ${error}`,
        bot,
        statChatId,
      ),
    );
