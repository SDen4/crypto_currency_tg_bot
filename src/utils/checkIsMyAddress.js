const donateBtcAddress = process.env.DONATE_BTC_ADDRESS;
const donateEthAddress = process.env.DONATE_ETH_ADDRESS;
const donateDogeAddress = process.env.DONATE_DOGE_ADDRESS;
const donateLightningAddress = process.env.DONATE_LIGHTNING_ADDRESS;

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
