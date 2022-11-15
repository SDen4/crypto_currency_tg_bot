const btnsCurrenciesTimer = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC/USD', callback_data: '/btcusd_set_timer' },
        { text: 'BTC/EUR', callback_data: '/btceur_set_timer' },
        { text: 'ETH/USD', callback_data: '/ethusd_set_timer' },
        { text: 'ETH/EUR', callback_data: '/etheur_set_timer' },
      ],
    ],
  },
};

const btnsCurrencies = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC/USD', callback_data: '/btcusd' },
        { text: 'BTC/EUR', callback_data: '/btceur' },
        { text: 'ETH/USD', callback_data: '/ethusd' },
        { text: 'ETH/EUR', callback_data: '/etheur' },
      ],
      [
        { text: 'EURt/EUR', callback_data: '/euteur' },
        { text: 'USDt/USD', callback_data: '/ustusd' },
        { text: 'USDC/USD', callback_data: '/udcusd' },
        { text: 'DOGE/USD', callback_data: '/doge:usd' },
      ],
      [
        { text: 'ADA/USD', callback_data: '/adausd' },
        { text: 'APT/USD', callback_data: '/aptusd' },
        { text: 'AVAX/USD', callback_data: '/avax:usd' },
        { text: 'AXS/USD', callback_data: '/axsusd' },
      ],
      [
        { text: 'BCHN/USD', callback_data: '/bchn:usd' },
        { text: 'DOT/USD', callback_data: '/dotusd' },
        { text: 'EOS/USD', callback_data: '/eosusd' },
        { text: 'ETC/USD', callback_data: '/etcusd' },
      ],
      [
        { text: 'FIL/USD', callback_data: '/filusd' },
        { text: 'GALA/USD', callback_data: '/gala:usd' },
        { text: 'IOTA/USD', callback_data: '/iotusd' },
        { text: 'LEO/USD', callback_data: '/leousd' },
      ],
      [
        { text: 'LINK/USD', callback_data: '/link:usd' },
        { text: 'LTC/USD', callback_data: '/ltcusd' },
        { text: 'MATIC/USD', callback_data: '/matic:usd' },
        { text: 'PAX/USD', callback_data: '/paxusd' },
      ],
      [
        { text: 'SOL/USD', callback_data: '/solusd' },
        { text: 'SUSHI/USD', callback_data: '/sushi:usd' },
        { text: 'TRX/USD', callback_data: '/trxusd' },
        { text: 'UNI/USD', callback_data: '/uniusd' },
      ],
      [
        { text: 'XCN/USD', callback_data: '/xcnusd' },
        { text: 'XMR/USD', callback_data: '/xmrusd' },
        { text: 'XTZ/USD', callback_data: '/xtzusd' },
        { text: 'XRP/USD', callback_data: '/xrpusd' },
      ],
    ],
  },
};

const btnsStart = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'All currencies', callback_data: '/currencies' },
        { text: 'BTC blocks info', callback_data: '/btcBlockInfo' },
      ],
      [
        { text: 'Timer', callback_data: '/settimer' },
        {
          text: 'App',
          web_app: { url: 'https://sden4.github.io/crypto_currency/' },
        },
        { text: 'Calculate pool', callback_data: '/pool' },
      ],
    ],
  },
};

const bnsTimer = {
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

const commands = [
  { command: '/info', description: 'Information' },
  { command: '/currencies', description: 'All currencies' },
];

module.exports = {
  btnsCurrenciesTimer,
  btnsCurrencies,
  btnsStart,
  bnsTimer,
  commands,
};
