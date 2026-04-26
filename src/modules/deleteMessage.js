const statChatId = process.env.STAT_CHAT_ID;

export const deleteMessage = async (bot, chatId, messageId) => {
  try {
    await bot.deleteMessage(chatId, messageId);
  } catch (error) {
    await bot.sendMessage(statChatId, `Delete error: ${error}`);
    await bot.sendMessage(chatId, `Delete error: ${error}`);
  }
};
