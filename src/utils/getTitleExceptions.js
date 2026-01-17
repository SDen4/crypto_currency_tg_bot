export const getTitleExceptions = (text, title) => {
  let newTitle;

  switch (text) {
    case '/ustusd':
      newTitle = 'USDt/USD';
      break;
    case '/udcusd':
      newTitle = 'USDC/USD';
      break;
    case '/iotusd':
      newTitle = 'IOTA/USD';
      break;
    case '/atousd':
      newTitle = 'ATOM/USD';
      break;
    case '/omnusd':
      newTitle = 'OMNI/USD';
      break;
    case '/algusd':
      newTitle = 'ALGO/USD';
      break;
    case '/wbtusd':
      newTitle = 'WBTC/USD';
      break;
    case '/dshusd':
      newTitle = 'DASH/USD';
      break;

    case '/tbtc:xaut':
      newTitle = 'BTC/XAUt';
      break;

    default:
      newTitle = title;
      break;
  }

  return newTitle;
};
