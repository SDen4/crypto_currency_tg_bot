import axios from 'axios';

import { fiatHistoryApi, statChatId } from '../../token.js';
import { sendErrorMessage } from '../modules/messages.js';

export const getFiatHistory = async (
  bot,
  currencyFrom,
  currencyTo,
  date,
  chatId,
) => {
  return await axios
    .get(fiatHistoryApi(currencyFrom, currencyTo))
    .then(async (response) => {
      const rates = response?.data?.['Time Series FX (Daily)'];

      if (rates) {
        const messageArr = Object.entries(rates).find((el) => el[0] === date);

        const message = `${currencyFrom}/${currencyTo} at ${date}:\n-------------------------\n${Object.entries(
          messageArr[1],
        )
          .map((el) => `${el[0]}: ${el[1]}`)
          .join('\n')}`;

        await bot.sendMessage(chatId, message || 'Data not find');
      }
    })
    .catch((error) =>
      sendErrorMessage(`in getFiatRest: ${error}`, bot, statChatId),
    );
};
