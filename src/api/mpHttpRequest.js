const axios = require('axios');

const {
  mpCurBlockUrl,
  mpIdUrl,
  mpHashUrl,
  mpLastBlock,
} = require('../../token');

const mpCurBlockRequest = async () => {
  const data = axios.get(mpCurBlockUrl).then((res) => res.data);

  return data;
};

const mpIdRequest = async () => {
  const data = axios.get(mpIdUrl).then((res) => res.data);

  return data;
};

const mpHashRequest = async () => {
  const data = axios.get(mpHashUrl).then((res) => res.data);

  return data;
};

const mpLastBlockRequest = async (hash) => {
  const data = axios.get(`${mpLastBlock}${hash}`).then((res) => res.data);

  return data;
};

module.exports = {
  mpCurBlockRequest,
  mpIdRequest,
  mpHashRequest,
  mpLastBlockRequest,
};
