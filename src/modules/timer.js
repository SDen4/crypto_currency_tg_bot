const httpRequest = require('../api/httpRequest');

const timer = async (bot, chatId, text) => {
  const timeInMinutes = Number(text.slice(6));

  if (timeInMinutes) {
    await bot.sendMessage(
      chatId,
      `You've set the timer to ${timeInMinutes} minutes`,
    );
    setTimeout(() => {
      httpRequest(bot, chatId, '/btcusd');
    }, timeInMinutes * 60000);
  } else {
    await bot.sendMessage(chatId, 'Invalid parameter');
  }
};

module.exports = timer;
