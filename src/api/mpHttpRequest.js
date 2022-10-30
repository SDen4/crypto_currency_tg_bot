const axios = require('axios');

const mpCurBlockRequest = async () => {
  const data = axios
    .get('https://mempool.space/api/v1/fees/mempool-blocks')
    .then((res) => res.data);

  return data;
};

const mpIdRequest = async () => {
  const data = axios
    .get('https://mempool.space/api/blocks/tip/height')
    .then((res) => res.data);

  return data;
};

module.exports = { mpCurBlockRequest, mpIdRequest };
