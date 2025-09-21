import { webAppUrl } from '../../token.js';

export const btnsCurrenciesArr = [
  [
    { text: 'BTC/USD', callback_data: '/btcusd' },
    { text: 'BTC/EUR', callback_data: '/btceur' },
    { text: 'BTC/JPY', callback_data: '/btcjpy' },
    { text: 'BTC/GBP', callback_data: '/btcgbp' },
  ],
  [
    { text: 'ETH/USD', callback_data: '/ethusd' },
    { text: 'ETH/EUR', callback_data: '/etheur' },
    { text: 'ETH/JPY', callback_data: '/ethjpy' },
    { text: 'ETH/GBP', callback_data: '/ethgbp' },
  ],
  [
    { text: 'USDt/USD', callback_data: '/ustusd' },
    { text: 'USDC/USD', callback_data: '/udcusd' },
    { text: 'ADA/USD', callback_data: '/adausd' },
    { text: 'ALGO/USD', callback_data: '/algusd' },
  ],
  [
    { text: 'A/USD', callback_data: '/eosusd' },
    { text: 'APE/USD', callback_data: '/apeusd' },
    { text: 'APT/USD', callback_data: '/aptusd' },
    { text: 'ARB/USD', callback_data: '/arbusd' },
  ],
  [
    { text: 'ATOM/USD', callback_data: '/atousd' },
    { text: 'AVAX/USD', callback_data: '/avax:usd' },
    { text: 'BCHN/USD', callback_data: '/bchn:usd' },
    { text: 'BTT/USD', callback_data: '/bttusd' },
  ],
  [
    { text: 'CHZ/USD', callback_data: '/chzusd' },
    { text: 'DAI/USD', callback_data: '/daiusd' },
    { text: 'DASH/USD', callback_data: '/dshusd' },
    { text: 'DOT/USD', callback_data: '/dotusd' },
  ],
  [
    { text: 'DOGE/USD', callback_data: '/doge:usd' },
    { text: 'DYM/USD', callback_data: '/dymusd' },
    { text: 'EOS/USD', callback_data: '/eosusd' },
    { text: 'ETC/USD', callback_data: '/etcusd' },
  ],
  [
    { text: 'FET/USD', callback_data: '/fetusd' },
    { text: 'FIL/USD', callback_data: '/filusd' },
    { text: 'GALA/USD', callback_data: '/gala:usd' },
    { text: 'GTX/USD', callback_data: '/gtxusd' },
  ],
  [
    { text: 'HI/USD', callback_data: '/hixusd' },
    { text: 'IOTA/USD', callback_data: '/iotusd' },
    { text: 'LEO/USD', callback_data: '/leousd' },
    { text: 'LINK/USD', callback_data: '/link:usd' },
  ],
  [
    { text: 'LTC/USD', callback_data: '/ltcusd' },
    { text: 'MKR/USD', callback_data: '/mkrusd' },
    { text: 'NEO/USD', callback_data: '/neousd' },
    { text: 'OMNI/USD', callback_data: '/omnusd' },
  ],
  [
    { text: 'PEPE/USD', callback_data: '/pepe:usd' },
    { text: 'PNK/USD', callback_data: '/pnkusd' },
    { text: 'RRT/USD', callback_data: '/rrtusd' },
    { text: 'SOL/USD', callback_data: '/solusd' },
  ],
  [
    { text: 'SUSHI/USD', callback_data: '/sushi:usd' },
    { text: 'TON/USD', callback_data: '/tonusd' },
    { text: 'TRX/USD', callback_data: '/trxusd' },
    { text: 'TUSD/USD', callback_data: '/tsdusd' },
  ],
  [
    { text: 'UNI/USD', callback_data: '/uniusd' },
    { text: 'UOS/USD', callback_data: '/uosusd' },
    { text: 'WBTC/USD', callback_data: '/wbtusd' },
    { text: 'XAUt/USD', callback_data: '/xaut:usd' },
  ],
  [
    { text: 'XDC/USD', callback_data: '/xdcusd' },
    { text: 'XLM/USD', callback_data: '/xlmusd' },
    { text: 'XMR/USD', callback_data: '/xmrusd' },
    { text: 'XTZ/USD', callback_data: '/xtzusd' },
  ],
  [
    { text: 'XRP/USD', callback_data: '/xrpusd' },
    { text: 'YFI/USD', callback_data: '/yfiusd' },
    { text: 'ZEC/USD', callback_data: '/zecusd' },
    { text: 'ZRX/USD', callback_data: '/zrxusd' },
  ],
];

const btnsCurrenciesTimerArr = btnsCurrenciesArr.map((el) =>
  el.map((i) => ({ ...i, callback_data: `${i.callback_data}_set_timer` })),
);
export const btnsCurrenciesTimer = {
  reply_markup: { inline_keyboard: btnsCurrenciesTimerArr },
};

const btnsCurrenciesChartArr = btnsCurrenciesArr.map((el) =>
  el.map((i) => ({ ...i, callback_data: `${i.callback_data}_set_chart` })),
);
export const btnsCurrenciesChart = {
  reply_markup: { inline_keyboard: btnsCurrenciesChartArr },
};

export const btnsCurrencies = {
  reply_markup: { inline_keyboard: btnsCurrenciesArr },
};

export const btnsFiatCurrencies = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'USD/EUR', callback_data: '/fiat-pair-USD/EUR' },
        { text: 'USD/GBP', callback_data: '/fiat-pair-USD/GBP' },
        { text: 'USD/RUB', callback_data: '/fiat-pair-USD/RUB' },
        { text: 'USD/AED', callback_data: '/fiat-pair-USD/AED' },
      ],
      [
        { text: 'USD/CNY', callback_data: '/fiat-pair-USD/CNY' },
        { text: 'USD/JPY', callback_data: '/fiat-pair-USD/JPY' },
        { text: 'USD/CAD', callback_data: '/fiat-pair-USD/CAD' },
        { text: 'USD/CHF', callback_data: '/fiat-pair-USD/CHF' },
      ],
      [{ text: 'All rates for USD', callback_data: '/fiat-all-USD' }],
      [
        { text: 'EUR/USD', callback_data: '/fiat-pair-EUR/USD' },
        { text: 'EUR/GBP', callback_data: '/fiat-pair-EUR/GBP' },
        { text: 'EUR/RUB', callback_data: '/fiat-pair-EUR/RUB' },
        { text: 'EUR/AED', callback_data: '/fiat-pair-EUR/AED' },
      ],
      [
        { text: 'EUR/CNY', callback_data: '/fiat-pair-EUR/CNY' },
        { text: 'EUR/JPY', callback_data: '/fiat-pair-EUR/JPY' },
        { text: 'EUR/CAD', callback_data: '/fiat-pair-EUR/CAD' },
        { text: 'EUR/GBP', callback_data: '/fiat-pair-EUR/GBP' },
      ],
      [{ text: 'All rates for EUR', callback_data: '/fiat-all-EUR' }],
      [
        { text: 'CNY/USD', callback_data: '/fiat-pair-CNY/USD' },
        { text: 'CNY/GBP', callback_data: '/fiat-pair-CNY/GBP' },
        { text: 'CNY/RUB', callback_data: '/fiat-pair-CNY/RUB' },
        { text: 'CNY/AED', callback_data: '/fiat-pair-CNY/AED' },
      ],
      [
        { text: 'CNY/EUR', callback_data: '/fiat-pair-CNY/EUR' },
        { text: 'CNY/JPY', callback_data: '/fiat-pair-CNY/JPY' },
        { text: 'CNY/CAD', callback_data: '/fiat-pair-CNY/CAD' },
        { text: 'CNY/GBP', callback_data: '/fiat-pair-CNY/GBP' },
      ],
      [{ text: 'All rates for CNY', callback_data: '/fiat-all-CNY' }],
      [
        { text: 'GBP/USD', callback_data: '/fiat-pair-GBP/USD' },
        { text: 'GBP/CHF', callback_data: '/fiat-pair-GBP/CHF' },
        { text: 'GBP/RUB', callback_data: '/fiat-pair-GBP/RUB' },
        { text: 'GBP/AED', callback_data: '/fiat-pair-GBP/AED' },
      ],
      [
        { text: 'GBP/EUR', callback_data: '/fiat-pair-GBP/EUR' },
        { text: 'GBP/JPY', callback_data: '/fiat-pair-GBP/JPY' },
        { text: 'GBP/CAD', callback_data: '/fiat-pair-GBP/CAD' },
        { text: 'GBP/CNY', callback_data: '/fiat-pair-GBP/CNY' },
      ],
      [{ text: 'All rates for GBP', callback_data: '/fiat-all-GBP' }],
      [
        { text: 'AUD/USD', callback_data: '/fiat-pair-AUD/USD' },
        { text: 'NZD/USD', callback_data: '/fiat-pair-NZD/USD' },
        { text: 'USD/MXN', callback_data: '/fiat-pair-USD/MXN' },
        { text: 'USD/HKD', callback_data: '/fiat-pair-USD/HKD' },
      ],
    ],
  },
};

export const checkAddrBtns = [
  { text: '👛 Check BTC address', callback_data: 'checkAddress_bitcoin' },
  { text: '👛 Check Doge address', callback_data: 'checkAddress_dogecoin' },
];

export const myLimitsBtn = { text: '🔒 My limits', callback_data: '/myLimits' };

const keyboardStart = [
  [
    { text: '💰 Live Crypto Rates', callback_data: '/currencies' },
    { text: '💵 Fiat Rates', callback_data: '/fiatcurrencies' },
  ],
  [
    { text: '📦 BTC Blocks Info', callback_data: '/btcBlockInfo' },
    { text: '🔢 Calculate Pool', callback_data: '/pool' },
  ],
  [
    { text: '📈 Charts', callback_data: '/charts' },
    { text: '⏰ Timer', callback_data: '/settimer' },
    { text: '🙏 Donate', callback_data: '/donate' },
  ],
  checkAddrBtns,
  [
    { text: 'ℹ️ Crypto Info', callback_data: '/cryptoInfo' },
    { text: '📱 App', web_app: { url: webAppUrl } },
    myLimitsBtn,
  ],
  [
    {
      text: '📅 History Of Fiat Rates',
      callback_data: '/fiatHistoryRatesMessage',
    },
  ],
];
const keyboardAdminStart = [
  ...keyboardStart,
  [
    { text: 'Users', callback_data: 'users' },
    { text: 'Users quantity', callback_data: 'usersquantity' },
    { text: 'Last 10', callback_data: 'stat' },
  ],
  [
    { text: 'New users chart', callback_data: 'unicuserschart' },
    { text: 'New users by dates', callback_data: 'unicusersbydates' },
  ],
  [
    { text: '🚫 Ban user', callback_data: 'banuser' },
    { text: '🆗 Unban user', callback_data: 'unbanuser' },
  ],
  [
    {
      text: '✅ Check my donate addresses',
      callback_data: 'checkMyDonateAdresses',
    },
  ],
  [
    {
      text: '☑️ Check the rest of fiat requests',
      callback_data: 'checkTheRestOfFiatRequests',
    },
  ],
  [
    {
      text: '🔄 Change user limit of fiat requests',
      callback_data: 'changeLimitOfFiatRequestsMessage',
    },
  ],
  [
    {
      text: '❌ Reset user fiat day requests',
      callback_data: 'resetFiatDayRequestMessage',
    },
  ],
  [
    {
      text: '📨 Message all users',
      callback_data: 'messageAllUsers',
    },
  ],
];

export const checkMyAddrBtns = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC', callback_data: 'checkMyBtcDonateAddress' },
        { text: 'ETH', callback_data: 'checkMyEthDonateAddress' },
        { text: 'DOGE', callback_data: 'checkMyDogeDonateAddress' },
      ],
    ],
  },
};

export const btnsStart = { reply_markup: { inline_keyboard: keyboardStart } };
export const btnsAdminStart = {
  reply_markup: { inline_keyboard: keyboardAdminStart },
};

export const bnsTimer = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '1 min', callback_data: '/timer1' },
        { text: '5 min', callback_data: '/timer5' },
        { text: '15 min', callback_data: '/timer15' },
        { text: '30 min', callback_data: '/timer30' },
        { text: '1 hour', callback_data: '/timer60' },
      ],
      [
        { text: '2 hours', callback_data: '/timer120' },
        { text: '3 hours', callback_data: '/timer180' },
        { text: '6 hours', callback_data: '/timer360' },
        { text: '12 hours', callback_data: '/timer720' },
        { text: '24 hours', callback_data: '/timer1440' },
      ],
    ],
  },
};

export const btnsDonate = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '⭐️ Telegram stars ⭐️',
          callback_data: '/sendTelegramStarInvoice',
        },
      ],
      [
        { text: 'Lightning addr', callback_data: '/copyAddressLightning' },
        { text: 'Lightning QR', callback_data: '/showQrLightning' },
      ],
      [
        { text: 'BTC addr', callback_data: '/copyAddressBTC' },
        { text: 'BTC QR', callback_data: '/showQrBtc' },
      ],
      [
        { text: 'ETH addr', callback_data: '/copyAddressETH' },
        { text: 'Doge addr', callback_data: '/copyAddressDoge' },
      ],
    ],
  },
};

export const commands = [
  { command: '/menu', description: '🗂️ Menu' },
  { command: '/currencies', description: '💰 Live Crypto Rates' },
  { command: '/fiatcurrencies', description: '💵 Fiat Rates' },
];

export const tgStarsCallbackData = [
  'sendTelegramStarInvoice1',
  'sendTelegramStarInvoice10',
  'sendTelegramStarInvoice100',
];
const inlineKeyboard = tgStarsCallbackData.map((el, i) => ({
  text: `${10 ** i} ⭐️`,
  callback_data: el,
}));

export const donateTgStarsBtns = {
  reply_markup: { inline_keyboard: [inlineKeyboard] },
};

export const chartBtns = (callback_data, msgId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: '📈 Chart', callback_data: `${callback_data}_set_chart` },
        {
          text: '🔄 Refresh',
          callback_data: `${callback_data}_currencyRefresh_${msgId}`,
        },
        { text: '🗑 Delete', callback_data: `/currencyInfoDelete_${msgId}` },
      ],
    ],
  },
});

export const btcBlockInfoBtns = (msgId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '🔄 Refresh',
          callback_data: `/btcblockinfoRefresh_${msgId}`,
        },
        { text: '🗑 Delete', callback_data: `/btcblockinfoDelete_${msgId}` },
      ],
    ],
  },
});
