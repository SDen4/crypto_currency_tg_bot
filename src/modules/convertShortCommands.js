const convertShortCommands = (text) => {
  switch (text) {
    case 'btc':
      return '/btcusd';

    default:
      return text;
  }
};

module.exports = { convertShortCommands };
