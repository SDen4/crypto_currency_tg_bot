const { statChatId, eugPartId } = require('../../token');
const { bfHttpInfoRequest } = require('../api/bfHttpInfoRequest');

const percentAlertMessage = (bot) => {
  const timeInMinutes = 60;
  const timer = setInterval(async() => await bfHttpInfoRequest(bot, [statChatId, eugPartId], '/btcusd', 5), timeInMinutes * 60000);
};

module.exports = { percentAlertMessage };