import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToBtcQr = `${path.join(__dirname, '..', 'pics')}/qrBtc.png`;
const pathToLightQr = `${path.join(__dirname, '..', 'pics')}/qrLightning.png`;

import {
  statChatId,
  donateBtcAddress,
  donateEthAddress,
  donateDogeAddress,
  donateLightningAddress,
} from '../../token.js';

import {
  btnsCurrencies,
  btnsStart,
  btnsAdminStart,
  bnsTimer,
  btnsCurrenciesTimer,
  btnsCurrenciesChart,
  btnsDonate,
  donateTgStarsBtns,
} from './buttons.js';
import { timestamp } from '../utils/timestamp.js';

export const unkCmd = async (bot, chatId) => {
  const text =
    "Sorry, I don't understand you, please try again or use menu buttons.";
  await bot.sendMessage(chatId, text, btnsStart);
};

export const start = async (bot, chatId, msg) => {
  const text1 = `Hello, ${msg?.from?.first_name}! Welcome to Crypto Currency Light Bot!`;
  const text2 = 'Use menu to see available commands';
  await bot.sendMessage(chatId, text1);
  await bot.sendMessage(chatId, text2);
};

export const menu = async (bot, chatId, msg) => {
  let btns = msg?.from?.id === statChatId ? btnsAdminStart : btnsStart;
  await bot.sendMessage(chatId, 'Menu', btns);
};

export const allCurrencies = async (bot, chatId) => {
  await bot.sendMessage(chatId, 'All currencies', btnsCurrencies);
};

export const secret = async (bot, chatId) => {
  const url =
    'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp';
  await bot.sendSticker(chatId, url);
};

export const setTmrMsgCur = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Select the currency for timer',
    btnsCurrenciesTimer,
  );
};

export const sendChartCurBtns = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Select the currency for chart',
    btnsCurrenciesChart,
  );
};

export const donate = async (bot, chatId) => {
  await bot.sendMessage(chatId, 'You can support the developer', btnsDonate);
};

export const showQr = async (bot, chatId, text) => {
  let pathToFile = '';

  switch (text) {
    case '/showQrBtc':
      pathToFile = pathToBtcQr;
      break;
    case '/showQrLightning':
      pathToFile = pathToLightQr;
      break;
    default:
      break;
  }

  await bot.sendPhoto(chatId, pathToFile);
};

export const copyDonateAddress = async (bot, chatId, text, msg) => {
  let address = '';
  switch (text) {
    case '/copyAddressBTC':
      address = donateBtcAddress;
      break;
    case '/copyAddressETH':
      address = donateEthAddress;
      break;
    case '/copyAddressDoge':
      address = donateDogeAddress;
      break;
    case '/copyAddressLightning':
      address = donateLightningAddress;
      break;
    default:
      break;
  }

  const currencyName = text.slice(12);

  await bot.sendMessage(
    chatId,
    `To copy ${currencyName} address to clipboard tap on`,
  );
  await bot.sendMessage(chatId, `\`${address}\``, { parse_mode: 'Markdown' });

  await bot.deleteMessage(chatId, msg.message.message_id);
};

export const sendTgStarInvoiceBtns = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'You can support the developer by Telegram Stars',
    donateTgStarsBtns,
  );
};

export const sendTgStarInvoice = async (bot, chatId, text) => {
  await bot.sendInvoice(
    chatId,
    'Support the developer',
    'Thank you for supporting us!',
    'payload',
    '',
    'XTR',
    [{ label: 'label', amount: Number(text.slice(23)) }],
  );
};

export const setTmrMsgTime = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    "You can set the timer manually in the format '/timer1', where '1' is the number of minutes after which the message will arrive or push a button below.",
    bnsTimer,
  );
};

export const poolMsg = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Type your pool to convert it to USD (format: 3 btc 1 eth ...etc)',
  );
};

export const statisticMsg = async (bot, chatId, stat, quant) => {
  const formatStat = Object.values(stat.data)
    .slice(-quant)
    .map((el, i) => {
      const date = el?.message?.date || el?.date;
      const firstName = el?.chat?.first_name || el?.from?.first_name;
      const id = el?.chat?.id || el?.from?.id;
      const username = el?.chat?.username || el?.from?.username || '';
      const text = el?.text || el?.data;
      const lang = el?.from?.language_code;

      return `${i + 1}. ${timestamp(date)} | ${firstName} (<code>${id}</code>${
        username && '/'
      }<code>${username}</code>) | ${lang} | text: ${text}\n`;
    })
    .join('');

  await bot.sendMessage(
    chatId,
    `Statistic\n----------------------\n${formatStat}`,
    { parse_mode: 'HTML' },
  );
};

export const statisticUsersMsg = async (bot, chatId, stat) => {
  const data = Object.values(stat.data);

  let message = '';
  for (let i = 1; i <= data.length; i++) {
    const el = data[i - 1];

    message += `${
      el?.isBanned ? '❗️❗️❗️ USER BANNED ❗️❗️❗️\n' : ''
    } <b>${i}</b>. <u>${el.firstName} ${
      el.lastName ? el.lastName : ''
    }</u> (<code>${el.id}</code>${
      el.username ? `, <tg-spoiler><i>${el.username}</i></tg-spoiler>` : ''
    }), ${el.lang ? `${el.lang},` : ''} ${
      el.isBot ? '<b>bot</b>' : '<s>bot</s>'
    }\n${
      el.isPremium ? '<b>premium</b>' : '<s>premium</s>'
    }, first visit: ${timestamp(el.firstVisit)}${
      i !== data.length
        ? '\n- - - - - - - - - - - - - - - - - - - - - - - - - - -\n'
        : ''
    }`;

    if (i === data.length || (i !== 0 && i % 10 === 0)) {
      await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      message = '';
    }
  }
};

export const emojiMsg = async (text, bot, chatId) => {
  const hex = (
    Number(text.codePointAt(0)) + Number((Math.random() * 10 + 1).toFixed(0))
  ).toString(16);
  await bot.sendMessage(chatId, String.fromCodePoint('0x' + hex));
};

export const checkAddressMsg = async (bot, chatId) => {
  await bot.sendMessage(chatId, 'Send me the address');
};

export const sendBannedUserIdMsg = async (bot, chatId, text) => {
  await bot.sendMessage(chatId, `Send me user id you want to be ${text}`);
};
