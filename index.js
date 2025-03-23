import TgBotApi from 'node-telegram-bot-api';

import { token, statChatId } from './token.js';

import { manyRequestsErrorText } from './src/constants/index.js';

import { checkRequestLimit } from './src/utils/checkRequestLimit.js';

import { sendErrorMessage } from './src/modules/messages.js';
import { commands } from './src/modules/buttons.js';
import { percentAlertMessage } from './src/modules/percentAlertMessage.js';

import { answerPreCheckoutQuery } from './src/root/answerPreCheckoutQuery.js';
import { callbackQuery } from './src/root/callbackQuery.js';
import { message } from './src/root/message.js';

const bot = new TgBotApi(token, { polling: true });

let selectedCurrency = { x: '' };
let checkAddressMode = { x: null };
let isBanUser = { x: false };
let isUnbanUser = { x: false };

bot.setMyCommands(commands);
percentAlertMessage(bot);

bot.on('message', async (msg) => {
  const chatId = msg?.chat?.id;

  if (chatId && !checkRequestLimit(chatId)) {
    await bot.sendMessage(chatId, manyRequestsErrorText);
    return;
  }

  await message(
    bot,
    msg,
    selectedCurrency,
    checkAddressMode,
    isBanUser,
    isUnbanUser,
  ).catch((error) => sendErrorMessage(error, bot, statChatId));
});

bot.on('callback_query', async (msg) => {
  const chatId = msg?.message?.chat?.id;
  // const chatId = msg?.from?.id; // spare path

  if (chatId && !checkRequestLimit(chatId)) {
    await bot.sendMessage(chatId, manyRequestsErrorText);
    return;
  }

  await callbackQuery(
    bot,
    msg,
    checkAddressMode,
    selectedCurrency,
    isBanUser,
    isUnbanUser,
  ).catch((error) => sendErrorMessage(error, bot, statChatId));
});

bot.on(
  'pre_checkout_query',
  async (query) =>
    await answerPreCheckoutQuery(bot, query).catch((error) =>
      sendErrorMessage(error, bot, statChatId),
    ),
);
