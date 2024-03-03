const { statChatId } = require('../../token');
const { bfHttpInfoRequest } = require('../api/bfHttpInfoRequest');

const percentAlertMessage = (bot) => {
  const timeInMinutes = 30;
  const timer = setInterval(async() => await bfHttpInfoRequest(bot, statChatId, '/btcusd', 3), timeInMinutes * 60000);
};

module.exports = { percentAlertMessage };