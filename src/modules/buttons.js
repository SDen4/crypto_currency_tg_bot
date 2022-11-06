const buttons = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC/USD', callback_data: '/btcusd' },
        { text: 'BTC/EUR', callback_data: '/btceur' },
        { text: 'ETH/USD', callback_data: '/ethusd' },
        { text: 'ETH/EUR', callback_data: '/etheur' },
      ],
      [
        { text: 'LTC/USD', callback_data: '/ltcusd' },
        { text: 'SOL/USD', callback_data: '/solusd' },
        { text: 'XRP/USD', callback_data: '/xrpusd' },
        { text: 'ADA/USD', callback_data: '/adausd' },
      ],
      [
        { text: 'APT/USD', callback_data: '/aptusd' },
        { text: 'EOS/USD', callback_data: '/eosusd' },
        { text: 'ETC/USD', callback_data: '/etcusd' },
        { text: 'FIL/USD', callback_data: '/filusd' },
      ],
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

const buttonsTimer = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '5 min', callback_data: '/timer5' },
        { text: '15 min', callback_data: '/timer15' },
        { text: '30 min', callback_data: '/timer30' },
        { text: '60 min', callback_data: '/timer60' },
        { text: '90 min', callback_data: '/timer90' },
      ],
    ],
  },
};

const commands = [
  { command: '/info', description: 'Information' },
  { command: '/btcusd', description: 'Currency BTC/USD' },
  { command: '/btceur', description: 'Currency BTC/EUR' },
  { command: '/ethusd', description: 'Currency ETH/USD' },
  { command: '/etheur', description: 'Currency ETH/EUR' },
];

module.exports = { buttons, buttonsTimer, commands };
