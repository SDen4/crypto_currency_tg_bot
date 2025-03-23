import {
  mpCurBlockRequest,
  mpHashRequest,
  mpLastBlockRequest,
} from '../api/mpHttpRequest.js';
import { generateMessageId } from '../utils/generateMessageId.js';
import { btcBlockInfoBtns } from '../modules/buttons.js';
import { deleteMessage } from '../modules/deleteMessage.js';
import { btcBlockInfoMsg } from './messages.js';

export const btcBlockInfo = async (bot, chatId, isRefresh, isDelete) => {
  const updates = await bot.getUpdates();
  const messageId = await generateMessageId(updates);

  try {
    if (isDelete) {
      await deleteMessage(bot, chatId, messageId);
      return;
    }

    const [hash, allData] = await Promise.all([
      mpHashRequest(bot),
      mpCurBlockRequest(bot),
    ]);

    const lastBlock = await mpLastBlockRequest(bot, hash);

    if (allData?.length) {
      if (isRefresh) {
        await bot.editMessageText(btcBlockInfoMsg(lastBlock, allData), {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: btcBlockInfoBtns.reply_markup,
        });
        return;
      }

      await bot.sendMessage(
        chatId,
        btcBlockInfoMsg(lastBlock, allData),
        btcBlockInfoBtns,
      );
    } else {
      await bot.sendMessage(chatId, 'No data in BTC Blocks Info');
    }
  } catch {
    await bot.sendMessage(
      chatId,
      "Informaiton hasn't changed. Please, try again later",
    );
    await bot.deleteMessage(chatId, messageId);
  }
};
