const statChatId = String(process.env.STAT_CHAT_ID);

export const visitors = async (bot, msg) => {
  const command = msg?.data || msg?.text;

  if (String(msg.from.id) === statChatId) return;

  await bot.sendMessage(
    statChatId,
    `User <code>${msg.from.id}</code> (${msg?.from?.first_name} ${
      msg?.from?.last_name || ''
    }, ${msg?.from?.language_code}): ${command}`,
    { parse_mode: 'HTML' },
  );
};
