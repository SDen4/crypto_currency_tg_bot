const TgBotApi = require('node-telegram-bot-api');
const axios = require('axios');

const token = require('./token');

const bot = new TgBotApi(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Start bot' },
  { command: '/info', description: 'Information about all commands' },
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
    await bot.sendSticker(
      chatId,
      'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp',
    );

    await bot.sendMessage(
      chatId,
      `Hello, ${firstName} ${lastName}! Welcome to Crypto Currency Light Bot!`,
    );
  } else if (text === '/info') {
    await bot.sendMessage(
      chatId,
      `To get course data, enter one of the available command in the format:
        "/btcusd"
        "/btceur"
        "/ethusd"
        "/etheur"`,
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
          .slice(4)}: ${data[0]}
          ----------------------
          Price of the last trade: ${data[6]}
          Price of the last lowest ask: ${data[2]}
          Sum of the 25 highest bid sizes: ${data[1]}
          Sum of the 25 lowest ask sizes: ${data[3]}
          Daily volume: ${data[7]}
          Daily high: ${data[8]}
          Daily low: ${data[9]}
          Amount that the last price has changed since yesterday: ${data[4]}
          ----------------------
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
