import { statChatId, eugPartId } from '../../token.js';
import { bfHttpInfoRequest } from '../api/bfHttpInfoRequest.js';

const minutes = 15;

export const percentAlertMessage = (bot) => {
  setInterval(
    async () =>
      await bfHttpInfoRequest(bot, [statChatId, eugPartId], '/btcusd', 5),
    minutes * 60000,
  );
};
