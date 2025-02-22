import {
  mpCurBlockRequest,
  mpHashRequest,
  mpLastBlockRequest,
} from '../api/mpHttpRequest.js';
import { refreshBtcBlockInfo } from '../modules/buttons.js';
import { sendErrorMessage, btcBlockInfoMsg } from './messages.js';

let messageId = '';
let refreshBtnMessageId = '';

export const btcBlockInfo = async (bot, chatId, isRefresh) => {
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
        });
      } else {
        const sentMessage = await bot.sendMessage(
          chatId,
          btcBlockInfoMsg(lastBlock, allData),
        );

        const sentRefresh = await bot.sendMessage(
          chatId,
          'Refresh',
          refreshBtcBlockInfo,
        );

        messageId = sentMessage.message_id;
        refreshBtnMessageId = sentRefresh.message_id;
      }
    } else {
      await bot.sendMessage(chatId, 'No data in BTC Blocks Info');
    }
  } catch (error) {
    bot.deleteMessage(chatId, refreshBtnMessageId);
    sendErrorMessage(String(error), bot, chatId);

    refreshBtnMessageId = '';
    messageId = '';
  }
};
