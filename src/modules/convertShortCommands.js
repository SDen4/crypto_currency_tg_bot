export const convertShortCommands = (text) => {
  switch (String(text)?.toLocaleLowerCase().trim()) {
    case 'btc':
      return '/btcusd';

    case 'bitcoin':
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

    case 'gala':
      return '/gala:usd';

    case 'hi':
      return '/hixusd';

    case 'iota':
      return '/iotusd';

    case 'leo':
      return '/leousd';

    case 'link':
      return '/link:usd';

    case 'ltc':
      return '/ltcusd';

    case 'matic':
      return '/matic:usd';

    case 'ethw':
      return '/ethw:usd';

    case 'ftm':
      return '/ftmusd';

    case 'neo':
      return '/neousd';

    case 'xaut':
      return '/xaut:usd';

    case 'ton':
      return '/tonusd';

    case 'not':
      return '/notusd';

    case 'dym':
      return '/dymusd';

    case 'ftm':
      return '/ftmusd';

    case 'omg':
      return '/omgusd';

    case 'xdc':
      return '/xdcusd';

    case 'pepe':
      return '/pepe:usd';

    default:
      return text;
  }
};
