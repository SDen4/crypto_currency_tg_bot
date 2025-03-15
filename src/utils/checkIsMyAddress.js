import {
  donateBtcAddress,
  donateEthAddress,
  donateDogeAddress,
  donateLightningAddress,
} from '../../token.js';

export const checkIsMyAddress = (bot, chatId, isMyRequest, msg) => {
  if (
    !isMyRequest &&
    (msg?.text === donateBtcAddress ||
      msg?.text === donateEthAddress ||
      msg?.text === donateDogeAddress ||
      msg?.text === donateLightningAddress)
  ) {
    bot.sendMessage(chatId, "Yeah dude that's my address");
    return true;
  }
};
