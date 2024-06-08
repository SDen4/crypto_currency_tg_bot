import axios from 'axios';
import {
  checkAddrUrl,
  donateBtcAddress,
  donateEthAddress,
  donateDogeAddress,
  donateLightningAddress,
} from '../../token.js';
import { formatNumber } from '../utils/formatNumber.js';

export const getAddressInfo = async (bot, chatId, msg, coin) => {
  if (
    msg?.text === donateBtcAddress ||
    msg?.text === donateEthAddress ||
    msg?.text === donateDogeAddress ||
    msg?.text === donateLightningAddress
  ) {
    await bot.sendMessage(chatId, "Yeah dude that's my address");
    return;
  }

  try {
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
  } catch (error) {
    await bot.sendMessage(
      chatId,
      'Sorry, service is not available now, please try later',
    );
  }
};
