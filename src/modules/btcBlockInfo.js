import {
  mpCurBlockRequest,
  mpHashRequest,
  mpLastBlockRequest,
} from '../api/mpHttpRequest.js';

import { generateMessageId } from '../utils/generateMessageId.js';

import { btcBlockInfoBtns } from '../modules/buttons.js';
import { deleteMessage } from '../modules/deleteMessage.js';
import { btcBlockInfoMsg } from './messages.js';

export const btcBlockInfo = async (bot, chatId, msg, refrId, delId) => {
  try {
    const msgId = generateMessageId(msg);

    if (delId) {
      await deleteMessage(bot, chatId, msgId);
      return;
    }

    const [hash, allData] = await Promise.all([
      mpHashRequest(bot),
      mpCurBlockRequest(bot),
    ]);

    const lastBlock = await mpLastBlockRequest(bot, hash);

    if (allData?.length) {
      if (refrId) {
        await bot.editMessageText(btcBlockInfoMsg(lastBlock, allData), {
          chat_id: chatId,
          message_id: msgId,
          reply_markup: btcBlockInfoBtns(refrId).reply_markup,
        });
        return;
      }

      await bot.sendMessage(
        chatId,
        btcBlockInfoMsg(lastBlock, allData),
        btcBlockInfoBtns(msgId),
      );
    } else {
      await bot.sendMessage(chatId, 'No data in BTC Blocks Info');
    }
  } catch {
    await bot.sendMessage(
      chatId,
      "Informaiton hasn't changed. Please, try again later",
    );
  }
};
