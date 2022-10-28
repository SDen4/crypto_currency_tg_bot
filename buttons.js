const buttons = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'BTC/USD', callback_data: '/btcusd' },
        { text: 'BTC/EUR', callback_data: '/btceur' },
        { text: 'ETH/USD', callback_data: '/ethusd' },
        { text: 'ETH/EUR', callback_data: '/etheur' },
      ],
      [{ text: 'Set timer for BTC/USD', callback_data: '/settimer' }],
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

module.exports = { buttons, buttonsTimer };
