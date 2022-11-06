const TgBotApi = require('node-telegram-bot-api');

const { token, statChatId } = require('./token');
const bot = new TgBotApi(token, { polling: true });

const { ban } = require('./src/utils/ban');
const { bfHttpRequest } = require('./src/api/bfHttpRequest');
const { btcBlockInfo } = require('./src/modules/btcBlockInfo');
const { stat } = require('./src/modules/stat');
const { timer } = require('./src/modules/timer');
const { commands } = require('./src/modules/buttons');
const {
  unkCmd,
  start,
  info,
  secret,
  tmrMsg,
} = require('./src/modules/messages');

bot.setMyCommands(commands);

// WEB STAT
const server = require('express');
const cors = require('cors');
const app = server();
const PORT = 443;

app.use(server.json());
app.use(server.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/', (req, res) => {
  console.log(JSON.stringify(req?.headers).replace(/",/g, '",\n'));

  if (req.query.test === 'test') {
    res.status(200).send({ test: 'Success!' });
    bot.sendMessage(
      statChatId,
      `Web version visitor \nstatus: ${200} \nx-real-ip: ${
        JSON.stringify(req?.headers).replace(/",/g, '",\n') || 'no data in host'
      }`,
    );
  } else {
    res.status(204).send({ code: '204', message: 'no data' });
    bot.sendMessage(
      statChatId,
      `Web version visitor \nstatus: ${204} \nx-real-ip:${
        JSON.stringify(req?.headers).replace(/",/g, '",\n') || 'no data in host'
      }`,
    );
  }
});
// WEB STAT

const messageFunc = async (msg) => {
  const text = msg?.text;
  const chatId = msg?.chat?.id;

  if (ban(bot, chatId, msg)) return null;

  if (text === '/start') {
    start(bot, chatId, msg);
  } else if (text === '/info') {
    info(bot, chatId);
  } else if (
    text === '/btcusd' ||
    text === '/btceur' ||
    text === '/ethusd' ||
    text === '/etheur'
  ) {
    bfHttpRequest(bot, chatId, text);
  } else if (text === '/secret') {
    secret(bot, chatId);
  } else if (text.includes('/timer')) {
    timer(bot, chatId, text);
  } else {
    unkCmd(bot, chatId);
  }
  stat(bot, msg);
};

const buttonsFunc = async (msg) => {
  const chatId = msg?.message?.chat?.id;
  const text = msg?.data;

  if (ban(bot, chatId, msg)) return null;

  if (text === '/settimer') {
    tmrMsg(bot, chatId);
  } else if (text.includes('/timer')) {
    timer(bot, chatId, text);
  } else if (text === '/btcBlockInfo') {
    btcBlockInfo(bot, chatId);
  } else {
    bfHttpRequest(bot, chatId, text);
  }
  stat(bot, msg);
};

bot.on('message', messageFunc);
bot.on('callback_query', buttonsFunc);
