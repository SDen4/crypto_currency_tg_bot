import {
  mpCurBlockRequest,
  mpHashRequest,
  mpLastBlockRequest,
} from '../api/mpHttpRequest.js';

import { timestamp } from '../utils/timestamp.js';

export const btcBlockInfo = async (bot, chatId) => {
  // parallel requests
  const [hash, allData] = await Promise.all([
    mpHashRequest(),
    mpCurBlockRequest(),
  ]);

  const lastBlock = await mpLastBlockRequest(hash);

  if (allData?.length) {
    await bot.sendMessage(
      chatId,
      `Last block:\n - ${timestamp(lastBlock?.timestamp, true)}\n - id: ${
        lastBlock?.height || '?'
      }\n - transactions: ${
        lastBlock?.tx_count || '?'
      }\n-------------------------------\nCurrent block:\n - median fee: ${Math.ceil(
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
