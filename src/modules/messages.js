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
  btnsFiatCurrencies,
  btnsStart,
  btnsAdminStart,
  bnsTimer,
  btnsCurrenciesTimer,
  btnsCurrenciesChart,
  btnsDonate,
  donateTgStarsBtns,
  checkMyAddrBtns,
} from './buttons.js';

import { formatNumber } from '../utils/formatNumber.js';
import { timestamp } from '../utils/timestamp.js';

import { getFiatUser } from '../api/getFiatUser.js';
import { getUsersQuantity } from '../api/getUsersQuantity.js';
import { getAddressInfo } from '../api/getAddressInfo.js';
import { getAddressInfo2 } from '../api/getAddressInfo2.js';

export const unkCmd = async (bot, chatId) => {
  const text =
    "Sorry 🙏. I don't understand you. Please try again or use 👇menu buttons👇";
  await bot.sendMessage(chatId, text, btnsStart);
};

export const start = async (bot, chatId, msg) => {
  const text1 = `Hello, ${msg?.from?.first_name}! Welcome to Crypto Currency Light Bot!`;
  const text2 = 'Use menu to see available commands';
  await bot.sendMessage(chatId, text1);
  await bot.sendMessage(chatId, text2);
  await bot.sendMessage(chatId, 'Menu', btnsStart);
};

export const menu = async (bot, chatId, msg) => {
  let btns = msg?.from?.id === statChatId ? btnsAdminStart : btnsStart;
  await bot.sendMessage(chatId, '🗂️ Menu', btns);
};

export const allCurrencies = async (bot, chatId) => {
  await bot.sendMessage(chatId, '💰 All live crypto rates', btnsCurrencies);
};

export const fiatCurrencies = async (bot, chatId) => {
  await bot.sendMessage(chatId, '💵 All fiat rates', btnsFiatCurrencies);
};

export const secret = async (bot, chatId) => {
  const url =
    'https://tlgrm.eu/_/stickers/4e0/60a/4e060a5e-5bbe-3863-a9c7-62a5483692d4/2.webp';
  await bot.sendSticker(chatId, url);
};

export const setTmrMsgCur = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Select the crypto currency for timer',
    btnsCurrenciesTimer,
  );
};

export const sendChartCurBtns = async (bot, chatId) => {
  await bot.sendMessage(
    chatId,
    'Select the crypto currency for chart',
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
    'You can support the developer by Telegram Stars, choose the amount:',
    donateTgStarsBtns,
  );
};

export const sendTgStarInvoice = async (bot, chatId, text) => {
  const amount = Number(text.slice(23));

  await bot.sendInvoice(
    chatId,
    'Support the developer',
    `Please, confirm your payment: ${amount}⭐️`,
    'payload',
    '',
    'XTR',
    [{ label: 'label', amount }],
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
  const formatStat = stat?.data
    ? Object.values(stat.data)
        .slice(-quant)
        .map((el, i) => {
          const date = el?.message?.date || el?.date;
          const firstName = el?.chat?.first_name || el?.from?.first_name;
          const id = el?.chat?.id || el?.from?.id;
          const username = el?.chat?.username || el?.from?.username || '';
          const text = el?.text || el?.data;
          const lang = el?.from?.language_code;

          return `${i + 1}. ${timestamp(
            date,
          )} | ${firstName} (<code>${id}</code>${
            username && '/'
          }<code>${username}</code>) | ${lang} | text: ${text}\n`;
        })
        .join('')
    : 'Error! No data...';

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

export const thankDonateStarMsg = async (bot, msg) => {
  // TODO добавить chatId параметром функции, тк от по-разному определяется в messages и buttons
  await bot.sendMessage(
    msg?.chat?.id,
    `Thank you, ${
      msg?.from?.first_name || msg?.from?.username || 'dude'
    }, for supporting us!`,
  );
};

export const sendErrorMessage = async (error, bot, chatId) => {
  await bot.sendMessage(chatId, `Error: "${error}"`);
};

export const sendCryptoInfoMsg = async (bot, chatId, msg) => {
  await bot.sendMessage(
    chatId,
    `Hi ${msg?.from?.first_name || msg?.from?.username || 'dude'}!
Crypto currency or just [crypto](https://en.wikipedia.org/wiki/Cryptocurrency) is a digital currency designed to work through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it.
- [History](https://en.wikipedia.org/wiki/Cryptocurrency#History)
- [Architecture](https://en.wikipedia.org/wiki/Cryptocurrency#Architecture)
- [Regulation](https://en.wikipedia.org/wiki/Cryptocurrency#Regulation)
- [Legality](https://en.wikipedia.org/wiki/Cryptocurrency#Legality)
`,
    { parse_mode: 'markdown', disable_web_page_preview: true },
  );
};

export const currencyMsg = (title, data, recommendationText) =>
  `${title}: ${formatNumber(data[0])}
-----------------------------------
24h: ${formatNumber(data[5] * 100, 2, '%')} ${data[5] * 100 < 0 ? '⬇️' : '⬆️'}
Price of the last trade: ${formatNumber(data[6])}
Price of the last lowest ask: ${formatNumber(data[2])}
Sum of the 25 highest bid sizes: ${formatNumber(data[1], 2)}
Sum of the 25 lowest ask sizes: ${formatNumber(data[3], 2)}
Daily high: ${formatNumber(data[8])}
Daily low: ${formatNumber(data[9])}
Daily volume: ${formatNumber(data[7], 0)}
Amount that the last price has changed since yesterday: ${formatNumber(data[4])}
-----------------------------------
Recommendation: ${recommendationText}`;

export const btcBlockInfoMsg = (lastBlock, allData) => `
Last block:\n - ${timestamp(lastBlock?.timestamp, true)}\n - id: ${
  lastBlock?.height || '?'
}\n - transactions: ${
  lastBlock?.tx_count || '?'
}\n-------------------------------\nCurrent block:\n - median fee: ${Math.ceil(
  allData[0].medianFee,
).toFixed()} sat/vB\n - total fees: ${(
  Math.ceil(allData[0].totalFees) / 100000000
).toFixed(3)} BTC\n - size: ${(allData[0].blockSize / 1000000).toFixed(
  2,
)} MB\n - transactions: ${allData[0].nTx}`;

export const balanceMsg = async (bot, chatId, currency, address, isMy) => {
  await Promise.any([
    getAddressInfo(bot, chatId, { text: address }, currency, isMy),
    getAddressInfo2(bot, chatId, { text: address }, currency, isMy),
  ]).catch(() => {
    sendErrorMessage(
      'Find balance error. Please, try again later',
      bot,
      chatId,
    );
  });
};

export const myBalancesBtnsMsg = async (bot) => {
  return await bot.sendMessage(
    statChatId,
    '✅ Check my donate addresses:',
    checkMyAddrBtns,
  );
};

export const changeLimitOfFiatRequestsMessage = async (bot) => {
  return await bot.sendMessage(
    statChatId,
    'Copy this command <code>changeLimitOfFiatRequests-</code> and add after new limit and the user id.\nExample: "changeLimitOfFiatRequests-09-123456789",\n09 - new limit (❗️two numbers❗️)\n123456789 - user id',
    { parse_mode: 'HTML' },
  );
};

export const resetFiatDayRequestsMessage = async (bot) => {
  return await bot.sendMessage(
    statChatId,
    'Copy this command <code>resetFiatDayRequests-</code> and add after the user id.\nExample: "resetFiatDayRequests-123456789",\n123456789 - user id',
    { parse_mode: 'HTML' },
  );
};

export const usersQuantityMsg = async (bot) => {
  const usersQuantity = await getUsersQuantity(bot);
  const fiatUsers = await getFiatUser(bot);

  return await bot.sendMessage(
    statChatId,
    `Total users: ${usersQuantity} unique visitors\nFiat users: ${
      Object.keys(fiatUsers)?.length
    } unique visitors`,
  );
};
