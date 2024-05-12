import { banned, bannedUsers } from '../../token.js';

export const ban = (bot, chatId, msg) => {
  if (msg?.from?.is_bot) {
    bot.sendMessage(
      chatId,
      `Hello, ${msg?.from?.first_name}! It looks like you're a bot! Good buy!`,
    );
    return true;
  } else if (msg?.from?.language_code === banned) {
    bot.sendMessage(chatId, `Hello, ${msg?.from?.first_name} and good buy!`);
    return true;
  } else if (bannedUsers?.includes(chatId)) {
    bot.sendMessage(chatId, `Sorry, ${msg?.from?.first_name}, you has banned.`);
    return true;
  }

  return false;
};
