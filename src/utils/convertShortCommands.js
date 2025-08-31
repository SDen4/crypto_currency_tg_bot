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

    case 'atom':
      return '/atousd';

    case 'avax':
      return '/avax:usd';

    case 'bchn':
      return '/bchn:usd';

    case 'btt':
      return '/bttusd';

    case 'chz':
      return '/chzusd';

    case 'dai':
      return '/daiusd';

    case 'dash':
      return '/dshusd';

    case 'dot':
      return '/dotusd';

    case 'dym':
      return '/dymusd';

    case 'eos':
      return '/eosusd';

    case 'etc':
      return '/etcusd';

    case 'fil':
      return '/filusd';

    case 'gala':
      return '/gala:usd';

    case 'gtx':
      return '/gtxusd';

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

    case 'mkr':
      return '/mkrusd';

    case 'neo':
      return '/neousd';

    case 'omni':
      return '/omnusd';

    case 'pepe':
      return '/pepe:usd';

    case 'pnk':
      return '/pnkusd';

    case 'rrt':
      return '/rrtusd';

    case 'xaut':
      return '/xaut:usd';

    case 'ton':
      return '/tonusd';

    case 'trx':
      return '/trxusd';

    case 'tusd':
      return '/tsdusd';

    case 'wbtc':
      return '/wbtusd';

    case 'xdc':
      return '/xdcusd';

    case 'zec':
      return '/zecusd';

    case 'zrx':
      return '/zrxusd';

    default:
      return text;
  }
};
