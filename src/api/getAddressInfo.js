import axios from 'axios';

import { checkAddrUrl } from '../../token.js';

import { checkIsMyAddress } from '../utils/checkIsMyAddress.js';
import { formatNumber } from '../utils/formatNumber.js';

export const getAddressInfo = async (bot, chatId, msg, coin, isMyRequest) => {
  if (checkIsMyAddress(bot, chatId, isMyRequest, msg)) return;

  // try-catch uses in Promice.any

  const result = await axios
    .get(`${checkAddrUrl(coin)}${msg.text}`)
    .then((response) => response);

  let message = 'No data';
  const values = Object.values(result?.data?.data);
  if (values?.length) {
    const amountCoin = (await values[0]) * 0.00000001;
    const price = await result?.data?.context?.market_price_usd;
    const amountUSD = await formatNumber(amountCoin * price, 2, '$');

    message = `Balance: ${amountCoin} ${coin} (~${amountUSD})`;
  }
  await bot.sendMessage(chatId, message);
};
