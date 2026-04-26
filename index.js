import 'dotenv/config';
import TgBotApi from 'node-telegram-bot-api';

import { manyRequestsErrorText } from './src/constants/index.js';

import { checkRequestLimit } from './src/utils/checkRequestLimit.js';

import { sendErrorMessage } from './src/modules/messages.js';
import { commands } from './src/modules/buttons.js';
import { percentAlertMessage } from './src/modules/percentAlertMessage.js';

import { answerPreCheckoutQuery } from './src/root/answerPreCheckoutQuery.js';
import { callbackQuery } from './src/root/callbackQuery.js';
import { message } from './src/root/message.js';

const token = process.env.TOKEN;
const statChatId = process.env.STAT_CHAT_ID;

const bot = new TgBotApi(token, { polling: true });

const state = {
  selectedCurrency: '',
  checkAddressMode: null,
  isBanUser: false,
  isUnbanUser: false,
  isMessageAllUsersMode: false,
};

bot.setMyCommands(commands);
percentAlertMessage(bot);

bot.on('message', async (msg) => {
  const chatId = msg?.chat?.id;

  if (chatId && !checkRequestLimit(chatId)) {
    await bot.sendMessage(chatId, manyRequestsErrorText);
    return;
  }

  await message(bot, msg, state).catch((error) =>
    sendErrorMessage(error, bot, statChatId),
  );
});

bot.on('callback_query', async (msg) => {
  const chatId = msg?.message?.chat?.id;

  if (chatId && !checkRequestLimit(chatId)) {
    await bot.sendMessage(chatId, manyRequestsErrorText);
    return;
  }

  await callbackQuery(bot, msg, state).catch((error) =>
    sendErrorMessage(error, bot, statChatId),
  );
});

bot.on(
  'pre_checkout_query',
  async (query) =>
    await answerPreCheckoutQuery(bot, query).catch((error) =>
      sendErrorMessage(error, bot, statChatId),
    ),
);
