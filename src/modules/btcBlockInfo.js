import {
  mpCurBlockRequest,
  mpHashRequest,
  mpLastBlockRequest,
} from '../api/mpHttpRequest.js';
import { generateMessageId } from '../utils/generateMessageId.js';
import { btcBlockInfoBtns } from '../modules/buttons.js';
import { btcBlockInfoMsg } from './messages.js';

export const btcBlockInfo = async (bot, chatId, isRefresh, isDelete) => {
  const updates = await bot.getUpdates();
  const messageId = generateMessageId(updates);

  if (isDelete) {
    try {
      await bot.deleteMessage(chatId, messageId);
    } catch (error) {
      await bot.sendMessage(chatId, 'Delete bot error');
    } finally {
      return;
    }
  }

  try {
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
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Informaiton hasn't changed. Please, try again later",
    );
    await bot.deleteMessage(chatId, messageId);
  }
};
