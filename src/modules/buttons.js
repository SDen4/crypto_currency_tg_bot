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
    { text: 'EURt/EUR', callback_data: '/euteur' },
    { text: 'USDt/USD', callback_data: '/ustusd' },
    { text: 'USDC/USD', callback_data: '/udcusd' },
    { text: 'TON/USD', callback_data: '/tonusd' },
  ],
  [
    { text: 'ADA/USD', callback_data: '/adausd' },
    { text: 'ALGO/USD', callback_data: '/algusd' },
    { text: 'APE/USD', callback_data: '/apeusd' },
    { text: 'APT/USD', callback_data: '/aptusd' },
  ],
  [
    { text: 'ARB/USD', callback_data: '/arbusd' },
    { text: 'AVAX/USD', callback_data: '/avax:usd' },
    { text: 'AXS/USD', callback_data: '/axsusd' },
    { text: 'BCHN/USD', callback_data: '/bchn:usd' },
  ],
  [
    { text: 'BSV/USD', callback_data: '/bsvusd' },
    { text: 'CLO/USD', callback_data: '/clousd' },
    { text: 'DASH/USD', callback_data: '/dshusd' },
    { text: 'DOT/USD', callback_data: '/dotusd' },
  ],
  [
    { text: 'DOGE/USD', callback_data: '/doge:usd' },
    { text: 'EOS/USD', callback_data: '/eosusd' },
    { text: 'ETC/USD', callback_data: '/etcusd' },
    { text: 'ETHW/USD', callback_data: '/ethw:usd' },
  ],
  [
    { text: 'FET/USD', callback_data: '/fetusd' },
    { text: 'FIL/USD', callback_data: '/filusd' },
    { text: 'FLR/USD', callback_data: '/flrusd' },
    { text: 'FTM/USD', callback_data: '/ftmusd' },
  ],
  [
    { text: 'GALA/USD', callback_data: '/gala:usd' },
    { text: 'HI/USD', callback_data: '/hixusd' },
    { text: 'IOTA/USD', callback_data: '/iotusd' },
    { text: 'LEO/USD', callback_data: '/leousd' },
  ],
  [
    { text: 'LINK/USD', callback_data: '/link:usd' },
    { text: 'LTC/USD', callback_data: '/ltcusd' },
    { text: 'MATIC/USD', callback_data: '/matic:usd' },
    { text: 'NEO/USD', callback_data: '/neousd' },
  ],
  [
    { text: 'PAX/USD', callback_data: '/paxusd' },
    { text: 'SOL/USD', callback_data: '/solusd' },
    { text: 'SUSHI/USD', callback_data: '/sushi:usd' },
    { text: 'TRX/USD', callback_data: '/trxusd' },
  ],
  [
    { text: 'UNI/USD', callback_data: '/uniusd' },
    { text: 'XAUt/USD', callback_data: '/xaut:usd' },
    { text: 'XCN/USD', callback_data: '/xcnusd' },
    { text: 'XLM/USD', callback_data: '/xlmusd' },
  ],
  [
    { text: 'XMR/USD', callback_data: '/xmrusd' },
    { text: 'XTZ/USD', callback_data: '/xtzusd' },
    { text: 'XRP/USD', callback_data: '/xrpusd' },
    { text: 'YFI/USD', callback_data: '/yfiusd' },
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

export const checkAddrBtns = [
  { text: 'Check BTC address', callback_data: 'checkAddress_bitcoin' },
  { text: 'Check Doge address', callback_data: 'checkAddress_dogecoin' },
];

const keyboardStart = [
  [
    { text: 'All Currencies', callback_data: '/currencies' },
    { text: 'BTC Blocks Info', callback_data: '/btcBlockInfo' },
    { text: 'Calculate Pool', callback_data: '/pool' },
  ],
  [
    { text: 'Charts', callback_data: '/charts' },
    { text: 'Timer', callback_data: '/settimer' },
    { text: 'App', web_app: { url: webAppUrl } },
    { text: 'Donate', callback_data: '/donate' },
  ],
  checkAddrBtns,
];
const keyboardAdminStart = [
  ...keyboardStart,
  [
    { text: 'Users', callback_data: 'users' },
    { text: 'Last 10', callback_data: 'stat' },
  ],
];

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
  { command: '/menu', description: 'Menu' },
  { command: '/currencies', description: 'All Currencies' },
];
