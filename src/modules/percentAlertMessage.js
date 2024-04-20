import { statChatId, eugPartId } from '../../token.js';
import { bfHttpInfoRequest } from '../api/bfHttpInfoRequest.js';

export const percentAlertMessage = (bot) => {
  const timeInMinutes = 60;
  const timer = setInterval(
    async () =>
      await bfHttpInfoRequest(bot, [statChatId, eugPartId], '/btcusd', 5),
    timeInMinutes * 60000,
  );
};
