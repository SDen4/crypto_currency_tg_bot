const { mpCurBlockRequest } = require('../api/mpHttpRequest');
const { mpIdRequest } = require('../api/mpHttpRequest');

const btcBlockInfo = async (bot, chatId) => {
  const allData = await mpCurBlockRequest();
  const id = await mpIdRequest();

  if (allData?.length) {
    await bot.sendMessage(
      chatId,
      `Last block Id: ${id}\nCurrent block median fee: ${Math.ceil(
        allData[0].medianFee,
      ).toFixed()} sat/vB\nCurrnet block total fees: ${(
        Math.ceil(allData[0].totalFees) / 100000000
      ).toFixed(3)} BTC`,
    );
  } else {
    await bot.sendMessage(chatId, 'No data');
  }
};

module.exports = { btcBlockInfo };
