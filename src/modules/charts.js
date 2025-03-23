import axios from 'axios';
import { Buffer } from 'buffer';
import ChartJSImage from 'chart.js-image';

import { bfUrl } from '../../token.js';
import { timestamp } from '../utils/timestamp.js';
import { sendErrorMessage } from './messages.js';

// TODO: add tooltips
export const getChart = async (
  bot,
  chatId,
  selectedCurrency,
  msg,
  curValue,
) => {
  const currency = String(selectedCurrency).slice(1, -10).toUpperCase();

  const dateDiff = -new Date().getTimezoneOffset() / 60;
  const gtmDiff =
    dateDiff === 0 ? '' : dateDiff > 0 ? `+${dateDiff}` : dateDiff;

  await axios
    .get(`${bfUrl}/tickers/hist?symbols=t${currency}&limit=24`)
    .then((response) => {
      const data = response.data.reverse().map((el) => ({
        value: el[1],
        date: timestamp(el[12]),
      }));

      if (curValue) {
        data.push({ value: curValue, date: timestamp(new Date().getTime()) });
      }

      const firstDate = data?.[0]?.date.substring(0, 10);
      const lastDate = data?.[data.length - 1]?.date.substring(0, 10);
      const titleDate =
        firstDate === lastDate ? `${firstDate}` : `${firstDate} - ${lastDate}`;

      const chart = ChartJSImage()
        .chart({
          type: 'line',
          data: {
            labels: data.map((el) => el.date.substring(10)),
            datasets: [
              {
                borderColor: 'orange',
                backgroundColor: 'white',
                fill: false,
                borderWidth: 4,
                data: data.map((el) => el.value),
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: `${currency.substring(0, 3)}/${currency.substring(
                3,
              )} (${titleDate}, GMT${gtmDiff})`,
            },
            legend: { display: false },
            scales: { yAxes: [{ ticks: { beginAtZero: false } }] },
          },
        })
        .backgroundColor('white')
        .width(600)
        .height(300);

      chart.toDataURI().then((res) => {
        bot.sendPhoto(chatId, Buffer.from(res.substr(21), 'base64'), {
          filename: 'image',
          contentType: 'image/png',
        });
      });
    })
    .catch((error) => sendErrorMessage(error, bot, chatId))
    .finally(() => {
      bot.deleteMessage(chatId, msg.message.message_id);
    });
};
