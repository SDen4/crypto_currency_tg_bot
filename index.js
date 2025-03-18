import TgBotApi from 'node-telegram-bot-api';

import { token } from './token.js';

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

bot.on('message', (msg) =>
  message(bot, msg, selectedCurrency, checkAddressMode, isBanUser, isUnbanUser),
);

bot.on('callback_query', (msg) =>
  callbackQuery(
    bot,
    msg,
    checkAddressMode,
    selectedCurrency,
    isBanUser,
    isUnbanUser,
  ),
);

bot.on('pre_checkout_query', (query) => answerPreCheckoutQuery(bot, query));
