const { bfHttpRequest } = require('../api/bfHttpRequest');

const timer = async (bot, chatId, text) => {
  const timeInMinutes = Number(text.slice(6));

  if (timeInMinutes) {
    await bot.sendMessage(
      chatId,
      `You've set the timer to ${timeInMinutes} minutes`,
    );
    setTimeout(() => {
      bfHttpRequest(bot, chatId, '/btcusd');
    }, timeInMinutes * 60000);
  } else {
    await bot.sendMessage(chatId, 'Invalid parameter');
  }
};

module.exports = { timer };
