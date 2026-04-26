import { bfHttpInfoRequest } from '../api/bfHttpInfoRequest.js';

const eugPartId = process.env.EUG_PART_ID.split(',').map(String);
const statChatId = String(process.env.STAT_CHAT_ID);

const state = { minutes: 15, prevValue: 0 };

export const percentAlertMessage = (bot) => {
  setInterval(
    async () =>
      await bfHttpInfoRequest(
        bot,
        [statChatId, ...eugPartId],
        '/btcusd',
        state,
        5,
      ),
    state.minutes * 60000,
  );
};
