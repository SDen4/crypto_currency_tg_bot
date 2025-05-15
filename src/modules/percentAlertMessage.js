import { statChatId, eugPartId } from '../../token.js';
import { bfHttpInfoRequest } from '../api/bfHttpInfoRequest.js';

const state = { minutes: 15, prevValue: 0 };

export const percentAlertMessage = (bot) => {
  setInterval(
    async () =>
      await bfHttpInfoRequest(
        bot,
        [statChatId, eugPartId],
        '/btcusd',
        state,
        5,
      ),
    state.minutes * 60000,
  );
};
