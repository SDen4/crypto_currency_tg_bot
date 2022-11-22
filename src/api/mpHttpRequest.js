const axios = require('axios');

const { mpCurBlockUrl, mpIdUrl } = require('../../token');

const mpCurBlockRequest = async () => {
  const data = axios.get(mpCurBlockUrl).then((res) => res.data);

  return data;
};

const mpIdRequest = async () => {
  const data = axios.get(mpIdUrl).then((res) => res.data);

  return data;
};

module.exports = { mpCurBlockRequest, mpIdRequest };
