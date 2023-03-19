const {
  mpCurBlockRequest,
  mpIdRequest,
  mpHashRequest,
  mpLastBlockRequest,
} = require('../api/mpHttpRequest');

const { timestamp } = require('../utils/timestamp');

const btcBlockInfo = async (bot, chatId) => {
  const allData = await mpCurBlockRequest();
  const id = await mpIdRequest();
  const hash = await mpHashRequest();

  const lastBlock = await mpLastBlockRequest(hash);
  const date = await timestamp(lastBlock.timestamp, true);

  if (allData?.length) {
    await bot.sendMessage(
      chatId,
      `Last block:\n - id: ${id}\n - transactions: ${
        lastBlock?.tx_count || '?'
      }\n - time: ${date}\n-------------------------------\nCurrent block:\n - median fee: ${Math.ceil(
        allData[0].medianFee,
      ).toFixed()} sat/vB\n - total fees: ${(
        Math.ceil(allData[0].totalFees) / 100000000
      ).toFixed(3)} BTC\n - size: ${(allData[0].blockSize / 1000000).toFixed(
        2,
      )} MB\n - transactions: ${allData[0].nTx}`,
    );
  } else {
    await bot.sendMessage(chatId, 'No data');
  }
};

module.exports = { btcBlockInfo };
