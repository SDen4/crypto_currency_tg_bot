const axios = require('axios');

const { statUrl } = require('../../token');

const statistic = async (visit) => {
  await axios.post(statUrl, visit).then((response) => {
    return response;
  });
};

module.exports = { statistic };
  