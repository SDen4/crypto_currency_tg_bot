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
        { text: 'USDt/USD', callback_data: '/ustusd' },
        { text: 'LTC/USD', callback_data: '/ltcusd' },
        { text: 'SOL/USD', callback_data: '/solusd' },
        { text: 'XRP/USD', callback_data: '/xrpusd' },
      ],
      [
        { text: 'APT/USD', callback_data: '/aptusd' },
        { text: 'EOS/USD', callback_data: '/eosusd' },
        { text: 'ETC/USD', callback_data: '/etcusd' },
        { text: 'FIL/USD', callback_data: '/filusd' },
      ],
      [
        { text: 'DOGE/USD', callback_data: '/doge:usd' },
        { text: 'MATIC/USD', callback_data: '/matic:usd' },
        { text: 'SUSHI/USD', callback_data: '/sushi:usd' },
        { text: 'AVAX/USD', callback_data: '/avax:usd' },
      ],
      [
        { text: 'LINK/USD', callback_data: '/link:usd' },
        { text: 'ADA/USD', callback_data: '/adausd' },
        { text: 'XMR/USD', callback_data: '/xmrusd' },
        { text: 'DOT/USD', callback_data: '/dotusd' },
      ],
      [
        { text: 'BCHN/USD', callback_data: '/bchn:usd' },
        { text: 'USDC/USD', callback_data: '/udcusd' },
        { text: 'IOTA/USD', callback_data: '/iotusd' },
        { text: 'TRX/USD', callback_data: '/trxusd' },
      ],
      [
        { text: 'XCN/USD', callback_data: '/xcnusd' },
        { text: 'UNI/USD', callback_data: '/uniusd' },
        { text: 'GALA/USD', callback_data: '/gala:usd' },
        { text: 'LEO/USD', callback_data: '/leousd' },
      ],
    ],
  },
};

const btnsStart = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'All currencies', callback_data: '/currencies' }],

      [
        { text: 'Timer BTC/USD', callback_data: '/settimer' },
        {
          text: 'App',
          web_app: { url: 'https://sden4.github.io/crypto_currency/' },
        },
        { text: 'BTC blocks info', callback_data: '/btcBlockInfo' },
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

module.exports = { btnsCurrencies, btnsStart, bnsTimer, commands };
