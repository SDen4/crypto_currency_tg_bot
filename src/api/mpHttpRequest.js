import axios from 'axios';

import { sendErrorMessage } from '../modules/messages.js';

const mpLastBlock = process.env.MP_LAST_BLOCK;
const mpHashUrl = process.env.MP_HASH_URL;
const mpCurBlockUrl = process.env.MP_CUR_BLOCK_URL;
const statChatId = process.env.STAT_CHAT_ID;

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
