const { mpCurBlockRequest } = require('../api/mpHttpRequest');
const { mpIdRequest } = require('../api/mpHttpRequest');

const btcBlockInfo = async (bot, chatId) => {
  const allData = await mpCurBlockRequest();
  const id = await mpIdRequest();

  if (allData?.length) {
    await bot.sendMessage(
      chatId,
      `Last block Id: ${id}\n------------------------------\nCurrent block median fee: ${Math.ceil(
        allData[0].medianFee,
      ).toFixed()} sat/vB\nCurrnet block total fees: ${(
        Math.ceil(allData[0].totalFees) / 100000000
      ).toFixed(3)} BTC\nCurrent block size: ${(
        allData[0].blockSize / 1000000
      ).toFixed(2)} MB`,
    );
  } else {
    await bot.sendMessage(chatId, 'No data');
  }
};

module.exports = { btcBlockInfo };
