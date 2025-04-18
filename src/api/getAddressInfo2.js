import axios from 'axios';

import { checkIsMyAddress } from '../utils/checkIsMyAddress.js';
import { formatCurrencyName } from '../utils/formatCurrencyName.js';

import { checkAddrUrl2 } from '../../token.js';

export const getAddressInfo2 = async (
  bot,
  chatId,
  msg,
  currency,
  isMyRequest,
) => {
  const formattedCurrency = formatCurrencyName(currency);

  if (checkIsMyAddress(bot, chatId, isMyRequest, msg)) return;

  // try-catch uses in Promice.any

  const result = await axios
    .get(checkAddrUrl2(formattedCurrency, msg?.text))
    .then((response) => response);

  let message = 'No data';

  if (result?.data) {
    message = `Balance: ${
      result.data.balance / 100_000_000
    } ${formattedCurrency}`;
  }
  await bot.sendMessage(chatId, message);
};
