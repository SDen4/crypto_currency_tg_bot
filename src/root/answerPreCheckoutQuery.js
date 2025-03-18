export const answerPreCheckoutQuery = async (bot, query) => {
  await bot.answerPreCheckoutQuery(String(query.id), true);
};
