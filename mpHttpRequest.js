const axios = require('axios');

const mpHttpRequest = async () => {
  const data = axios
    .get('https://mempool.space/api/v1/fees/mempool-blocks')
    .then((res) => res.data);

  return data;
};

module.exports = mpHttpRequest;
