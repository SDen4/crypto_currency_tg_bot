import { banned } from '../../token.js';

export const ban = async (bot, chatId, msg) => {
  if (msg?.from?.is_bot) {
    await bot.sendMessage(
      chatId,
      `Hello, ${msg?.from?.first_name}! It looks like you're a bot! Good buy!`,
    );
    return true;
  } else if (msg?.from?.language_code === banned) {
    await bot.sendMessage(
      chatId,
      `Hello, ${msg?.from?.first_name} and good buy!`,
    );
    return true;
  }

  return false;
};
