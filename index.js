const TgBotApi = require('node-telegram-bot-api');
const axios = require('axios');

const token = require('./token');
const formatNumber = require('./formatNumber');

const bot = new TgBotApi(token, { polling: true });

bot.setMyCommands([
  { command: '/info', description: 'Information about currencies' },
  { command: '/btcusd', description: 'Currency BTC-USD' },
  { command: '/btceur', description: 'Currency BTC-EUR' },
  { command: '/ethusd', description: 'Currency ETH-USD' },
  { command: '/etheur', description: 'Currency ETH-EUR' },
]);

bot.on('message', async (msg) => {
  console.log(msg);

  const firstName = msg?.from?.first_name;
  const lastName = msg?.from?.last_name;

  const text = msg?.text;
  const chatId = msg?.chat?.id;

  if (text === '/start') {
    await bot.sendMessage(
      chatId,
      `Hello, ${firstName} ${lastName}! Welcome to Crypto Currency Light Bot!`,
    );
  } else if (text === '/info') {
    await bot.sendMessage(
      chatId,
      `Commands to get the crypto currencies:
        "/btcusd", "/btceur", "/ethusd", "/etheur"`,
    );
  } else if (text === '/secret') {
    await bot.sendSticker(
      chatId,
      'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp',
    );
  } else if (
    text === '/btcusd' ||
    text === '/btceur' ||
    text === '/ethusd' ||
    text === '/etheur'
  ) {
    const baseUrl = 'https://api-pub.bitfinex.com/v2';
    const pathParams = 'ticker';
    const queryParams = `t${text.toLocaleUpperCase().slice(1)}`;

    let promise = axios.get(`${baseUrl}/${pathParams}/${queryParams}`).then(
      (response) => {
        console.log('response.data: ', response.data);

        const data = response.data;
        const isBuy = Number(data?.[1]) < Number(data?.[3]);
        const isBuyText = isBuy ? 'Buy' : 'Sell';
        const answer = `${text.toLocaleUpperCase().slice(1, 4)}/${text
          .toLocaleUpperCase()
          .slice(4)}: ${formatNumber(data[0])}
          -------------------------------------------------------
          24h: ${formatNumber(data[5] * 100, 2, '%')}
          Price of the last trade: ${formatNumber(data[6])}
          Price of the last lowest ask: ${formatNumber(data[2])}
          Sum of the 25 highest bid sizes: ${formatNumber(data[1], 2)}
          Sum of the 25 lowest ask sizes: ${formatNumber(data[3], 2)}
          Daily volume: ${formatNumber(data[7], 2)}
          Daily high: ${formatNumber(data[8])}
          Daily low: ${formatNumber(data[9])}
          Amount that the last price has changed since yesterday: ${formatNumber(
            data[4],
          )}
          -------------------------------------------------------
          ${isBuyText}
          `;

        bot.sendMessage(chatId, answer);
      },
      (error) => {
        bot.sendMessage(
          chatId,
          `No data... 
        Error: ${error}`,
        );
      },
    );
  } else {
    await bot.sendMessage(
      chatId,
      "Sorry, I don't understand you, please try again.",
    );
  }
});
