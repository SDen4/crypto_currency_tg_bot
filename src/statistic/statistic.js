const axios = require('axios');

const { statUrl, statChatId } = require('../../token');

const saveStat = async (visit) => {
  const id = visit?.from?.id || visit?.chat?.id;
  if (id === statChatId) return;

  await axios.post(statUrl, visit).then((response) => {
    return response;
  });
};

const getStat = async () => {
  const res = await axios.get(statUrl).then((response) => {
    return response;
  });

  return res;
};

module.exports = { saveStat, getStat };
