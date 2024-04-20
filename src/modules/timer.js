import { bfHttpRequest } from '../api/bfHttpRequest.js';

export const timer = async (bot, chatId, text, selectedCurrency) => {
  const timeInMinutes = Number(text.slice(6));

  if (timeInMinutes) {
    await bot.sendMessage(
      chatId,
      `You've set the timer for ${selectedCurrency} to ${
        timeInMinutes === 1 ? '1 minute' : `${timeInMinutes} minutes`
      }`,
    );
    const timer = setTimeout(() => {
      bfHttpRequest(bot, chatId, selectedCurrency);
      clearTimeout(timer);
    }, timeInMinutes * 60000);
  } else {
    await bot.sendMessage(chatId, 'Invalid parameter');
  }
};
