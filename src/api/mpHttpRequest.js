const axios = require('axios');

const { mpCurBlockUrl, mpHashUrl, mpLastBlock } = require('../../token');

const mpCurBlockRequest = () => axios.get(mpCurBlockUrl).then((r) => r.data);

const mpHashRequest = () => axios.get(mpHashUrl).then((r) => r.data);

const mpLastBlockRequest = (hash) =>
  axios.get(`${mpLastBlock}${hash}`).then((r) => r.data);

module.exports = {
  mpCurBlockRequest,
  mpHashRequest,
  mpLastBlockRequest,
};
