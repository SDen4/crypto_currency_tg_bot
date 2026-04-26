const url = process.env.CHECK_ADD_URL_2;

export const checkAddrUrl2 = (coin, btcAddress) =>
  `${url}${coin}/main/addrs/${btcAddress}/balance`;
