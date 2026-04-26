const url = process.env.CHECK_ADD_URL;

export const checkAddrUrl = (coin) =>
  `${url}${coin}/addresses/balances?addresses=`;
