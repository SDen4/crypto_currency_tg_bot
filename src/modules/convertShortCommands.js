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

    case 'ada':
      return '/adausd';

    case 'algo':
      return '/algusd';

    case 'apt':
      return '/aptusd';

    case 'avax':
      return '/avax:usd';

    case 'axs':
      return '/axsusd';

    case 'bchn':
      return '/bchn:usd';

    case 'clo':
      return '/clousd';

    case 'dash':
      return '/dshusd';

    case 'dot':
      return '/dotusd';

    case 'eos':
      return '/eosusd';

    case 'etc':
      return '/etcusd';

    case 'fil':
      return '/filusd';

    default:
      return text;
  }
};

module.exports = { convertShortCommands };
