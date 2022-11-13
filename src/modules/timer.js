const { bfHttpRequest } = require('../api/bfHttpRequest');

const timer = async (bot, chatId, text, selectedCurrency) => {
  const timeInMinutes = Number(text.slice(6));

  if (timeInMinutes) {
    await bot.sendMessage(
      chatId,
      `You've set the timer for ${selectedCurrency} to ${
        timeInMinutes === 1 ? '1 minute' : `${timeInMinutes} minutes`
      }`,
    );
    setTimeout(() => {
      bfHttpRequest(bot, chatId, selectedCurrency);
    }, timeInMinutes * 60000);
  } else {
    await bot.sendMessage(chatId, 'Invalid parameter');
  }
};

module.exports = { timer };
