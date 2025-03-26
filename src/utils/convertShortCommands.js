export const convertShortCommands = (text) => {
  switch (String(text)?.toLowerCase().trim()) {
    case 'btc':
      return '/btcusd';

    case 'bitcoin':
      return '/btcusd';

    case 'bit coin':
      return '/btcusd';

    case 'eth':
      return '/ethusd';

    case 'usd':
      return '/btcusd';

    case 'eur':
      return '/btceur';

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

    case 'bchn':
      return '/bchn:usd';

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

    case 'neo':
      return '/neousd';

    case 'not':
      return '/notusd';

    case 'xaut':
      return '/xaut:usd';

    case 'ton':
      return '/tonusd';

    case 'trx':
      return '/trxusd';

    case 'dym':
      return '/dymusd';

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
