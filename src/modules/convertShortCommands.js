const convertShortCommands = (text) => {
  switch (String(text).toLocaleLowerCase()) {
    case 'btc':
      return '/btcusd';

    case 'eth':
      return '/ethusd';

    case 'usd':
      return '/btcusd';

    case 'eur':
      return '/btceur';

    case 'eurt':
      return '/euteur';

    case 'usdt':
      return '/ustusd';

    case 'usdc':
      return '/udcusd';

    case 'doge':
      return '/doge:usd';
      
    default:
      return text;
  }
};

module.exports = { convertShortCommands };
