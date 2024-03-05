const { statChatId } = require('../../token');
const { bfHttpInfoRequest } = require('../api/bfHttpInfoRequest');

const percentAlertMessage = (bot) => {
  const timeInMinutes = 60;
  const timer = setInterval(async() => await bfHttpInfoRequest(bot, statChatId, '/btcusd', 5), timeInMinutes * 60000);
};

module.exports = { percentAlertMessage };