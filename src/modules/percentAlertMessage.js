import { statChatId, eugPartId } from '../../token.js';
import { bfHttpInfoRequest } from '../api/bfHttpInfoRequest.js';

const timeInMinutes = 15;

export const percentAlertMessage = (bot) => {
  const timer = setInterval(
    async () =>
      await bfHttpInfoRequest(bot, [statChatId, eugPartId], '/btcusd', 5),
    timeInMinutes * 60000,
  );
};
