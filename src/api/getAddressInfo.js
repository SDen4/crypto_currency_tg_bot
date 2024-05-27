import axios from 'axios';
import { checkBtcAddrUrl } from '../../token.js';
import { formatNumber } from '../utils/formatNumber.js';

export const getAddressInfo = async (bot, chatId, msg) => {
  try {
    const result = await axios
      .get(`${checkBtcAddrUrl}${msg.text}`)
      .then((response) => response);

    let message = 'No data';
    const values = Object.values(result?.data?.data);
    if (values?.length) {
      const amountBTC = (await values[0]) * 0.00000001;
      const price = await result?.data?.context?.market_price_usd;
      const amountUSD = await formatNumber(amountBTC * price, 2, '$');

      message = `Balance: ${amountBTC} BTC (~ ${amountUSD})`;
    }
    await bot.sendMessage(chatId, message);
  } catch (error) {
    await bot.sendMessage(
      chatId,
      'Sorry, service is not available now, please try later',
    );
  }
};
