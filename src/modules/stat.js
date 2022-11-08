const { statChatId } = require('../../token');

const stat = async (bot, msg) => {
  const command = msg?.data || msg?.text;

  if (msg.from.id === statChatId) return;

  await bot.sendMessage(
    statChatId,
    `User ${msg.from.id} (${msg?.from?.first_name} ${msg?.from?.last_name}, ${msg?.from?.language_code}) requests ${command}`,
  );
};

module.exports = { stat };
