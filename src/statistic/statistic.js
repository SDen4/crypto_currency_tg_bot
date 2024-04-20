import axios from 'axios';

import { statUrl, statChatId } from '../../token.js';

export const saveStat = async (visit) => {
  const id = visit?.from?.id || visit?.chat?.id;
  if (id === statChatId) return;

  await axios.post(statUrl, visit).then((response) => response);
};

export const getStat = async () => {
  const res = await axios.get(statUrl).then((response) => response);

  return res;
};
