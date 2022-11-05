const server = require('express');
const cors = require('cors');

const { statChatId } = require('../../token');

const app = server();
const PORT = 80;

const statWeb = async (bot) => {
  app.use(server.json());
  app.use(cors());
  app.use(server.urlencoded({ extended: true }));

  let result;

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  app.get('/', (req, res) => {
    console.log('query: ', req.query);
    result = req.query;

    if (req.query.test === 'test') {
      res.status(200).send({ test: 'Success!' });
    } else {
      res.status(204).send({ code: '204', message: 'no data' });
    }
  });

  await bot.sendMessage(statChatId, result);
};

module.exports = { statWeb };
