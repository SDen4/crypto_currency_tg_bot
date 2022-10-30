const mpHttpRequest = require('../api/mpHttpRequest');

const btcCurBlockFees = async (bot, chatId) => {
  const allData = await mpHttpRequest();

  if (allData?.length) {
    await bot.sendMessage(
      chatId,
      `Median fee: ${Math.ceil(
        allData[0].medianFee,
      ).toFixed()} sat/vB\nTotal fees: ${(
        Math.ceil(allData[0].totalFees) / 100000000
      ).toFixed(3)} BTC`,
    );
  } else {
    await bot.sendMessage(chatId, 'No data');
  }
};

module.exports = btcCurBlockFees;
