import { sendErrorMessage } from '../modules/messages.js';

export const unicUsersByDates = async (bot, chatId, chartData) => {
  try {
    bot.sendMessage(
      chatId,
      Object.entries(chartData)
        .map((el) => `${el[0]}: ${el[1]}\n`)
        .join(''),
    );
  } catch (error) {
    sendErrorMessage(error, bot, chatId);
  }
};
