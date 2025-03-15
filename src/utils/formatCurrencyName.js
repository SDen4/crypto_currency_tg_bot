const currenciesNames = {
  bitcoin: 'btc',
  dogecoin: 'doge',
  ethcoin: 'eth',
};

export const formatCurrencyName = (currencyLong) => {
  return currenciesNames[currencyLong] || currencyLong;
};
